export interface IBase {
  createdAt?: string;
}
export interface IApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
export interface IApiError {
  message: string;
  status: number;
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IUpsertResponse {
  id: number;
}
