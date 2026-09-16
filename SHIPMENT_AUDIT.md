# Cart and shipment reliability audit

## Confirmed code defects

- The browser accepted a blank description; the creation action and Package schema rejected it. The customer saw only a generic creation error.
- Browser validation required an address regardless of shipment mode. Consolidation hides the address control and depended on a client effect filling it from a cart. A missing/deleted receiver could also crash the dedicated add-to-cart page while reading `address._id`.
- Creation manually started/committed transactions without retrying transient conflicts or uncertain commit results. Simultaneous additions to one cart can contend on that cart document. MongoDB's [convenient transaction API](https://www.mongodb.com/docs/drivers/node/current/crud/transactions/) supplies the retry handling missing here.
- Cart numbering read the newest cart and added one. Concurrent requests could assign identical names; malformed or out-of-order historical names could produce invalid or reused numbers. There is no unique name constraint in the checked-in Order schema, so duplicate numbering is a confirmed race risk, not proof of the reported production exception.
- Admin consolidation assigned `Package.userId` to the administrator while the cart belonged to a customer. A successfully saved package could therefore be absent from that customer's package listing.
- A missing client session could still produce a success toast. Creation errors offered a page refresh that discarded entered details. Package editing redirected even when saving failed.
- Cart updates called `order.save()` without awaiting it. Many queries used while opening creation forms also did not await database connection readiness.

## Changes

- Client and server share required-description, non-negative value, valid mode, and conditional cart/address validation. Consolidation takes its destination from the selected cart rather than a hidden form requirement.
- A server-only creation service saves the cart/package links within `withTransaction`, using sequential operations and bounded callback retries. The driver handles commit retries; commit attempts have a five-second server limit. The callback budget is not a strict overall request deadline because individual database/network operations can still take time.
- A fixed-ID counter is initialized from the greatest valid historical `SD-#` number once, then incremented inside each new-cart transaction. Its intrinsic `_id` uniqueness handles concurrent initialization without relying on a new application index. Gaps or legacy duplicate names are not rewritten.
- The form retains a UUID for the same submission during its mounted lifetime. The authenticated actor and UUID deterministically identify the package; retries return the committed result instead of inserting another shipment. Changed details get a fresh UUID. Reloading/reopening the form creates a new submission, so the UI asks users to retry in place after uncertain failures.
- Submitted identities are checked against the authenticated session. Customers can use only their own carts and addresses; admins retain the on-behalf-of-customer flow. Consolidated packages use the cart owner's identity.
- Expected errors are returned as plain data, so production's server-error sanitization does not hide their explanation. Unexpected errors return a reference and a retry message. The forms retain entries, suppress duplicate clicks, and navigate using the saved cart ID only after confirmed success.
- Connection readiness and cart updates are awaited. Failed edits remain on the form and display an error. Package-edit cache invalidation no longer contains a trailing space.

## Production diagnosis

No production logs or authenticated production reproduction were available in this task. These fixes address verified code paths; they do not establish which failure caused a particular incident. No production shipments were created or deleted, and nothing was deployed.

After deployment, search application/function logs for the UUID displayed with the error:

- `shipment.create.started`: the request passed authentication and validation.
- `shipment.create.completed`: the service confirmed persistence; contains cart/package IDs and elapsed milliseconds.
- `shipment.create.failed`: contains elapsed milliseconds and safe database error codes/labels.
- `shipment.refresh.failed`: persistence succeeded but cache invalidation failed.

A start with no completion/failure may indicate a function timeout or termination; correlate it with hosting-provider logs rather than assuming that no write occurred. Completed saves followed by a browser error suggest a lost response or navigation problem. Retry the same submission before manually recreating it.

Production still needs reachable MongoDB, a replica set/sharded deployment supporting transactions (already required by the previous implementation), and suitable hosting execution limits. Do not run old and new cart-number writers concurrently during rollout. Existing duplicate names, orphan records, or database indexes were not inspected or repaired here; the previously configured local database had a DNS failure.

## Validation

- 39 isolated tests pass: 22 onboarding/address regressions and 17 shipment regressions. Shipment tests cover validation, transaction replay/rollback, exhausted retry budgets, unknown commit recovery, repeated requests, ownership, admin attribution, support references, cache failures, duplicate clicks, both form navigation paths, targeted page invalidation without competing client refreshes, and a real Mongoose model surviving development hot reload.
- TypeScript and focused Next.js ESLint rules pass. Full repository lint still depends on the previously missing `eslint-plugin-n` package.
- Transactions in these tests use a simulated transactional store; actual MongoDB isolation, failure labels, load, and production hosting timeouts remain unverified. The prior local production-build attempt was blocked by Windows access to `.next/trace` while a development server was running. This task did not interrupt that server or claim a fresh production build.

Before release, exercise new carts and consolidation as both a customer and an admin against a staging replica set. Submit parallel new carts, parallel additions to the same cart, and repeat one request UUID after deliberately dropping its response. Check that cart numbers differ, each package is linked exactly once to the correct customer, and failed transactions leave no partial records.

## Local add-order follow-up

Reproduced a development hot-reload failure: a previously compiled Package model lacks the new creationFingerprint field, silently strips it during document construction, and makes the save service reject its own newly created package. The model now adds the missing field and recompiles accessors on the cached model. A regression test verifies both newly constructed and hydrated documents using actual Mongoose, without database writes.

The local development server responds on port 3000. A read-only database audit succeeds outside the tool sandbox; the sandboxed timeout does not establish an application database outage. The user confirmed the exact error, "This submission changed. Please submit it again with a new request.", matching the reproduced schema failure. The accessible browser is signed out, so a successful authenticated submission still needs confirmation. No test orders were written to the configured database.

For the subsequent slow-redirect report, removed the client refresh immediately following navigation in both order forms. Shipment creation now invalidates affected details, lists, and dashboard pages instead of both entire dashboard layouts. Regression checks cover invalidation scope and absence of competing refreshes. No authenticated before/after latency measurement was available; development compilation and remote database latency remain possible contributors.
