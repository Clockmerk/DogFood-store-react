import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: initialState.favorites,
  reducers: {
    changeFavoriteStatus: (state, action) => {
      const product = state.find((element) => element === action.payload);

      if (product) {
        return state.filter((element) => element !== action.payload);
      }
      state.push(action.payload);
    },
    clearFavorites: () => {
      return initialState.favorites;
    },
  },
});

export const { changeFavoriteStatus, clearFavorites } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
