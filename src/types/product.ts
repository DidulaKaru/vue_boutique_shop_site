export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  category: string;
}

export interface DummyJSONProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
