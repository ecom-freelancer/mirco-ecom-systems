export interface CreateCustomerPayload {
  email: string;
  password: string;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
}
