export interface Slide {
  id: number;
  imageUrl: string;    // 🎯 ЗАМЕНИТЬ image -> imageUrl
  title: string;
  description: string;
  link: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSlideRequest {
  imageUrl: string;
  title: string;
  description: string;
  link: string;
  isActive?: boolean;
  order?: number;
}

export interface UpdateSlideRequest extends Partial<CreateSlideRequest> {
  id: number;
}