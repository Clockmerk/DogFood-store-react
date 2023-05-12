import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState.filter,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
