import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState.cart,
  reducers: {
    clearCart: () => {
      return initialState.cart;
    },
    setCart: {
      reducer(state, action) {
        const product = state.find(
          (element) => element._id === action.payload._id
        );

        if (product) {
          product.count++;
          return;
        }
        state.push(action.payload);
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      prepare(value) {
        return {
          payload: {
            _id: value,
            count: 1,
            isSelected: false,
          },
        };
      },
    },
    incrementQuantity: (state, action) => {
      const product = state.find((element) => element._id === action.payload);

      if (product) {
        product.count++;
        return;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.find((element) => element._id === action.payload);

      if (product) {
        if (product.count > 1) {
          product.count--;
          return;
        }
        return state.filter((element) => element._id !== action.payload);
      }
    },
    changeSelect: (state, action) => {
      const product = state.find((element) => element._id === action.payload);

      if (product) {
        product.isSelected === false
          ? (product.isSelected = true)
          : (product.isSelected = false);
        return;
      }
    },
    buyFromCart: (state) => {
      return state.filter((element) => element.isSelected !== true);
    },
    removeFromCart: (state, action) => {
      return state.filter((element) => element._id !== action.payload);
    },
  },
});

export const {
  setCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  changeSelect,
  buyFromCart,
  removeFromCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
