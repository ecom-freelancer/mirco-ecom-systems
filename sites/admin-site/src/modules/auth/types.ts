export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface ILoginPayload {
  username: string;
  password: string;
}
