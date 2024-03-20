export interface CloudinaryOptions {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  acceptFolders?: Array<string>;
}

export type FileFormat =
  | 'pdf'
  | 'png'
  | 'jpg'
  | 'jpeg'
  | 'svg'
  | 'gift'
  | 'csv';

export type FileMIME =
  | 'text/csv'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/png'
  | 'application/pdf'
  | 'image/svg+xml'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const fileMIMEMapping: Record<FileFormat, FileMIME> = {
  csv: 'text/csv',
  pdf: 'application/pdf',
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  svg: 'image/svg+xml',
  gift: 'image/gif',
};
