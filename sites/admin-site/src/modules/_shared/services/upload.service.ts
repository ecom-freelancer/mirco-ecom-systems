import appApi from 'configs/fetchers/app-api';

const API_URL = '/files';
export interface IFileService {
  upload: (file: File) => Promise<string>;
}

export interface IImageUploadResponse {
  url: string;
  id?: string;
}

export const fileService: IFileService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await appApi.post<IImageUploadResponse>(
      `${API_URL}/upload-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.url;
  },
};
