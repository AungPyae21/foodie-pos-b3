import { Order } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface OrderSlice {
  items: Order[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: OrderSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setOrders, setIsLoading } = orderSlice.actions;
export default orderSlice.reducer;
