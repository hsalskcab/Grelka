export interface Seller {
  id: number;
  name: string;
  iconUrl: string;    // 🎯 ЗАМЕНИТЬ icon -> iconUrl
  createdAt: string;
  updatedAt: string;
}

export interface CreateSellerRequest {
  name: string;
  iconUrl: string;
}

export interface UpdateSellerRequest extends Partial<CreateSellerRequest> {
  id: number;
}