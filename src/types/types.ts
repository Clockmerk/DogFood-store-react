import { Dispatch, SetStateAction } from "react";

export interface ProductsType {
  total: number;
  products: [];
}

interface ReviewsType {
  rating: number;
  _id: string;
  text: string;
  author: string;
  product: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface AuthorType {
  name: string;
  about: string;
  avatar: string;
  _id: string;
  email: string;
  group: string;
  __v: number;
  readonly token: string;
}

export interface ProductCardType {
  discount: number;
  stock: number;
  available: boolean;
  pictures: string;
  likes: string[];
  reviews: ReviewsType[];
  tags: string[];
  isPublished: boolean;
  _id: string;
  name: string;
  author: AuthorType;
  price: number;
  wight: string;
  description: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

interface FilterReduxType {
  search: string;
}

interface CartReduxType {
  id: string;
  count: number;
}

export interface InitialStateReduxType {
  user: AuthorType;
  filter: FilterReduxType;
  cart: CartReduxType[];
  favorites: string[];
}

export type ValuesSignInType = {
  email: string;
  password: string;
};

export type ValuesSignUpType = {
  email: string;
  password: string;
  group: string;
};

export interface SignUpProps {
  activeTab: Dispatch<SetStateAction<string>>;
}
