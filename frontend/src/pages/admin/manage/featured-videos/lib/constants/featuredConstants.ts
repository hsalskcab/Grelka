export const VIDEO_FORM_DEFAULT_VALUES = {
  videoUrl: '',
  sellerId: '',
  description: '',
  isFeatured: false,
  order: 0
};

export const VIDEO_STATUS = {
  FEATURED: 'featured',
  NOT_FEATURED: 'not_featured'
} as const;

export const SORT_OPTIONS = {
  ORDER: 'order',
  CREATED_AT: 'createdAt',
  DESCRIPTION: 'description'
} as const;

export const ITEMS_PER_PAGE = 10;