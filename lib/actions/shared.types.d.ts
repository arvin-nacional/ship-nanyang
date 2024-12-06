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
