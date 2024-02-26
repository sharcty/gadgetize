export interface Item {
  id: number;
  name: string;
  type: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  reviews: Review[];
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
}
