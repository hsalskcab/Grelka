
export interface FeaturedVideoWithSeller {
  id: number;                   // ← number вместо string
  sellerId: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  seller: {
    id: number;                 // ← number вместо string
    name: string;
    iconUrl: string;            // ← iconUrl вместо icon
  };
}