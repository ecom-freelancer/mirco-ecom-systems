export interface FacebookResponseInterface {
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  error?: {
    message?: string;
  };
}
