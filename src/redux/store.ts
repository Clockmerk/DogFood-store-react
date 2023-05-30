import { configureStore } from "@reduxjs/toolkit";
import { LC_redux, getInitialState } from "./initialState";
import { userReducer } from "./slices/userSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { filterReducer } from "./slices/filterSilice";
import { cartReducer } from "./slices/cartSlice";
import { favoriteReducer } from "./slices/favoritesSlices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
  },
  preloadedState: getInitialState(),
});

store.subscribe(() => {
  localStorage.setItem(LC_redux, JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
