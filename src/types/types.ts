import { Dispatch, SetStateAction } from "react";

export interface ProductsType {
  total: number;
  products: [];
}

export interface ProductsArrayType {
  itemsArray: ProductCardType[];
}

export interface ReviewsArrayType {
  reviews: ReviewsType[];
}
interface ReviewsType {
  rating: number;
  _id: string;
  text: string;
  author: AuthorType;
  product: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface ReviewsCommentType {
  rating: number;
  text: string;
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
  sort: string;
}

interface CartReduxType {
  _id: string;
  count: number;
  isSelected: boolean;
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
  name: string;
  about: string;
  avatar: string;
};

export interface SignUpProps {
  activeTab: Dispatch<SetStateAction<number>>;
}

export type ValuesUpdateUserType = {
  name: string;
  about: string;
};

export type ValuesUpdateAvatarType = {
  avatar: string;
};

export interface AddProductType {
  name: string;
  price: number;
  wight: string;
  discount: number;
  stock: number;
  description: string;
  pictures: string;
}
