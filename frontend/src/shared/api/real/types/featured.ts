export interface FeaturedVideo {
  id: number;
  sellerId: number;
  title: string;
  description: string;
  videoUrl: string;    // 🎯 ЗАМЕНИТЬ videoUrl -> videoUrl (оставить)
  thumbnailUrl: string;
  duration: number;
  views: number;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface FeaturedVideoWithSeller extends FeaturedVideo {
  seller: {
    id: number;
    name: string;
    iconUrl: string;    // 🎯 ЗАМЕНИТЬ icon -> iconUrl
  };
}

export interface CreateFeaturedVideoRequest {
  sellerId: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  isFeatured?: boolean;
  order?: number;
}

export interface UpdateFeaturedVideoRequest extends Partial<CreateFeaturedVideoRequest> {
  id: number;
}