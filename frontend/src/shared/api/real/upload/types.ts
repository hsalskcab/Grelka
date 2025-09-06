export interface UploadResponse {
  url: string;
  fileName: string;
  fileSize: number;
  contentType: string;
}

export interface UploadProgressEvent {
  loaded: number;
  total: number;
  percent: number;
}

export type FileType = 'image' | 'video' | 'document';