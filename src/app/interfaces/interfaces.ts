enum ItemType {
  TVs = 'TVs',
  Appliances = 'Appliances',
  Phones = 'Phones',
  VideoGames = 'Video Games',
}

export interface Item {
  id: number;
  name: string;
  type: ItemType;
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
