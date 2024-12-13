export interface CreateUserParams {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export interface createAddressParams {
  clerkId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  contactNumber: string;
  path: string;
  name: string;
  isDefault: boolean;
}

export interface createPackageParams {
  clerkId: string;
  trackingNumber: string;
  address: string;
  description: string;
  value: string;
  vendor: string;
  type: string;
  orderId: string;
}

export interface GetUserByClerkIdParams {
  clerkId: string;
}

export interface DeleteUserParams {
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
  addressId?: string;
}
