export interface Slide {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
  isActive: boolean;
  order: number;
}

export interface CreateSlideDto extends Omit<Slide, 'id'> {}
export interface UpdateSlideDto extends Partial<CreateSlideDto> {}