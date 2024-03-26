export interface IUser {
  id: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface ILoginWithPasswordPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginWithGooglePayload {
  accessToken: string;
}

export interface ILoginWithFacebook {
  accessToken: string;
}
