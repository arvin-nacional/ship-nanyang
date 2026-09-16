# Onboarding audit — 2026-09-16

## Confirmed failure paths

1. **Signup skipped incomplete profiles.** `components/auth/SignUp.tsx` returned the user dashboard for `userType === "user"` before its incomplete-profile branch, making that branch unreachable. Both auth components also chose redirects from client user metadata while authentication was still in progress. The local sign-in force-redirect environment setting pointed directly to the dashboard.
2. **Dashboard access did not require onboarding.** The old middleware and dashboard page checks were commented out. Returning users could open dashboard URLs without completing required details.
3. **The form depended on webhook timing.** `getUserByClerkIdFromCreate` polled MongoDB for up to 60 attempts before failing. Delayed or missing `user.created` delivery could therefore stall or fail the initial request. Clerk documents this timing limitation in its [webhook overview](https://clerk.com/docs/guides/development/webhooks/overview).
4. **Completion was recorded too early.** `updateUser` marked Clerk metadata complete before saving the address and profile. A later database failure left the two systems inconsistent. Server-side required-field validation and ownership checks were also missing from this action.
5. **Failures were invisible.** The form logged submission errors without displaying feedback. Signed-out visits to the onboarding page threw an error instead of redirecting to sign-in.
6. **Repeated webhooks could create duplicate users.** Creation used an unconditional insert, and the Clerk ID had no unique schema index. The webhook also rewrote the default Clerk role and reserialized the body before checking its signature.

## Implemented behavior

- Signup, signin, and transfers between the two always land at `/create-account`. The root Clerk provider explicitly sets both redirect destinations so dashboard environment defaults cannot bypass the server check.
- The onboarding page sends signed-out visitors to signin, admins to their dashboard, and customers with saved required details to the user dashboard. Other customers see the form.
- The shared dashboard layout checks MongoDB completion on entry. Existing Clerk metadata is not trusted as proof of saved details. This is a navigation guard, not a replacement for authorization inside unrelated application actions/APIs.
- If the current signed-in customer has no MongoDB record, onboarding provisions it from Clerk immediately. A shared, insert-only upsert handles the webhook and synchronous request. A unique Clerk ID index and duplicate-key recovery protect concurrent provisioning; replayed events preserve saved details and roles.
- Saving validates required details and privacy acceptance on the server, binds the operation to the signed-in user, and uses their saved address. Initial address writes use a stable ID so retries after a partial failure reuse that address.
- The address and user are persisted before updating Clerk completion metadata. MongoDB remains authoritative if the metadata sync fails. Cache invalidation and client refresh make the completed profile visible immediately.
- Submission errors keep the entered values and show a retry message. Onboarding load failures have a retry screen.

## Verification and deployment notes

- `npm run test:onboarding`: 15 isolated regression tests pass. They exercise the actual TypeScript modules with mocked Clerk, MongoDB, and Next adapters, including missing/delayed user creation, absent/stale claims, routing, invalid submissions, ownership, save ordering/failures, retries, raw webhook bodies, and duplicate-key recovery. They do not replace a real browser signup or MongoDB concurrency test.
- TypeScript: `node --preserve-symlinks --preserve-symlinks-main node_modules/typescript/bin/tsc --noEmit --incremental false` passes.
- Production build: completes successfully (exit 0), including compilation and type checking. It logs MongoDB DNS/buffering errors while collecting existing page data, plus the existing missing `metadataBase` warning. This is not evidence of working live database access.
- The repository ESLint configuration cannot load because the installed dependencies are missing `eslint-plugin-n` (required by `eslint-config-standard`).
- A focused lint pass using the installed `next/core-web-vitals` and `next/typescript` rules passes for the onboarding actions, provisioning/completion helpers, auth components, webhook, dashboard layout, and onboarding page/error screen.
- The read-only database audit (`node scripts/check-onboarding.cjs`) cannot connect from this environment: DNS resolution returns `ENOTFOUND`. No database records were changed. Duplicate counts and deployed indexes remain unverified.

Before deployment, run the read-only audit against the intended database. Resolve any duplicate/missing Clerk IDs with a reviewed data migration, preserving referenced addresses/orders. Ensure the `users` collection has a unique `{ clerkId: 1 }` index. The schema creates this index when Mongoose auto-indexing is enabled; environments with auto-indexing disabled must install it explicitly. Conflicting existing indexes or duplicate data must be resolved first. Do not delete user records blindly.

In a Clerk test environment, verify email signup and social signup, signin after abandoning onboarding, direct dashboard navigation before completion, successful completion followed by refresh, and one forced save failure followed by retry. Delay/replay the creation webhook to confirm that the form still loads and that completed details remain intact. Live Clerk browser flows have not been exercised here.
