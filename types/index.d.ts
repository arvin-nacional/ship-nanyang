export interface ParamsProps {
  params: { id: string };
}

export interface CreateUserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  postalCode: string;
  country: string;
  privacyPolicyAccepted: boolean;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  contactNumber: string;
}
