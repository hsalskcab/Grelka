export interface UploadResponse {
  url: string;
  fileName: string;
  fileSize: number;
  contentType: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percent: number;
}