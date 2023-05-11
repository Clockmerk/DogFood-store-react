import { AuthorType, InitialStateReduxType } from "../types/types";

export const LC_redux = "redux-store";

export const initialState: InitialStateReduxType = {
  user: {} as AuthorType,
  filter: {
    search: "",
  },
  cart: [],
  favorites: [],
};

export const getInitialState = () => {
  const data = localStorage.getItem(LC_redux);

  return data ? JSON.parse(data) : initialState;
};
