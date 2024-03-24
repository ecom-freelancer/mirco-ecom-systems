export interface IApiError {
  message: string;
  status: number;
}

export interface IAPIResponse<T = any> {
  status: number;
  data: T;
  message: string;
}
