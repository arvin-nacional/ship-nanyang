export interface CreateUserParams {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export interface GetUserByClerkIdParams {
  clerkId: string;
}

export interface UpdateUserParams {
  clerkId: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  privacyPolicyAccepted: boolean;
  path: string;
}
