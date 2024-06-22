import { CartItem, CartSlice } from "@/types/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CartSlice = {
  isLoading: false,
  items: [],
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exist = state.items.find((item) => item.id === action.payload.id);
      if (exist) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
