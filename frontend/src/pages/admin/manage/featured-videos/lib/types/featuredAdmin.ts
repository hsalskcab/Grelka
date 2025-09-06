import { FeaturedVideo } from '@/shared/api/real';

export interface VideoTableItem extends FeaturedVideo {
  sellerName: string;
  sellerIcon: string;
}

export interface VideoFilters {
  isFeatured?: boolean;
  sellerId?: string;
  search?: string;
}

export interface SortConfig {
  key: keyof FeaturedVideo;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}