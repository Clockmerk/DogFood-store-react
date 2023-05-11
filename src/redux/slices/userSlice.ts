import { createSlice } from "@reduxjs/toolkit";
import { LC_redux, initialState } from "../initialState";

export const userSlice = createSlice({
  name: "user",
  initialState: initialState.user,
  reducers: {
    setUpUser: (_, action) => {
      return action.payload;
    },
    cleanUser: () => {
      localStorage.removeItem(LC_redux);
      return initialState.user;
    },
  },
});

export const { setUpUser, cleanUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
