import { ProfileSchema } from "./validations";

interface OnboardingProfile {
  verified?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  privacyPolicyAccepted?: boolean;
  address?: {
    contactNumber?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
  } | null;
}

// A Clerk metadata flag alone does not prove that the required details saved.
export function isOnboardingComplete(user: OnboardingProfile | null): boolean {
  return Boolean(
    user?.verified &&
      ProfileSchema.safeParse({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        privacyPolicyAccepted: user.privacyPolicyAccepted,
        contactNumber: user.address?.contactNumber,
        addressLine1: user.address?.addressLine1,
        addressLine2: user.address?.addressLine2 || "",
        city: user.address?.city,
        province: user.address?.province || "",
        postalCode: user.address?.postalCode || "",
        country: user.address?.country || "PH",
      }).success
  );
}
