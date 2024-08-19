import { config } from "@/config";
import {
  CreateOrderOptions,
  RefreshOrderOptions,
  UpdateOrderOptions,
} from "@/types/order";
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const creatOrder = createAsyncThunk(
  "order/createorder",
  async (options: CreateOrderOptions, thunkApi) => {
    const { tableId, cartItems, OnSuccess, OnError } = options;
    try {
      const response = await fetch(`${config.orderapiBaseUrl}order`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tableId, cartItems }),
      });
      const { orders } = await response.json();
      thunkApi.dispatch(setOrders(orders));
      OnSuccess && OnSuccess(orders);
    } catch (err) {
      OnError && OnError();
    }
  }
);
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (options: UpdateOrderOptions, thunkApi) => {
    const { itemId, status, OnSuccess, OnError } = options;
    try {
      thunkApi.dispatch(setIsLoading(true));
      const response = await fetch(
        `${config.backOfficeBaseUrl}order?itemId=${itemId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const { orders } = await response.json();
      thunkApi.dispatch(setOrders(orders));
      thunkApi.dispatch(setIsLoading(false));
      OnSuccess && OnSuccess(orders);
    } catch (err) {
      OnError && OnError();
    }
  }
);
export const refreshOrder = createAsyncThunk(
  "order/refreshOrder",
  async (options: RefreshOrderOptions, thunkApi) => {
    const { orderSeq, OnSuccess, OnError } = options;
    try {
      thunkApi.dispatch(setIsLoading(true));
      const response = await fetch(
        `${config.orderapiBaseUrl}order?orderSeq=${orderSeq}`
      );
      const { orders } = await response.json();
      thunkApi.dispatch(setOrders(orders));
      thunkApi.dispatch(setIsLoading(false));
      OnSuccess && OnSuccess(orders);
    } catch (err) {
      OnError && OnError();
    }
  }
);

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
