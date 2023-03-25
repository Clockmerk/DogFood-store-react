export interface ProductsType {
  total: number;
  products: [];
}

interface Reviews {
  rating: number;
  _id: string;
  text: string;
  author: string;
  product: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

interface Author {
  name: string;
  about: string;
  avatar: string;
  _id: string;
  email: string;
  __v: number;
}

export interface ProductCard {
  discount: number;
  stock: number;
  available: boolean;
  pictures: string;
  likes: [""];
  reviews: [Reviews];
  tags: [""];
  isPublished: boolean;
  _id: string;
  name: string;
  author: Author;
  price: number;
  wight: string;
  description: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
