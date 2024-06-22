import { config } from "@/config";
import { TableSlice, createTableParam } from "@/types/table";
import { Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: TableSlice = {
  tables: [],
  isLoading: false,
  error: null,
};
export const createTable = createAsyncThunk(
  "table/createTable",
  async (payload: createTableParam, thunkAPI) => {
    const { OnSuccess } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}table`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newTable } = dataFromServer;
    thunkAPI.dispatch(addTables(newTable));
    OnSuccess && OnSuccess();
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },
    addTables: (state, action: PayloadAction<Table>) => {
      state.tables = [...state.tables, action.payload];
    },
  },
});

export const { setTables, addTables } = tableSlice.actions;
export const tableSelector = (state: RootState) => {
  return state.table.tables;
};
export default tableSlice.reducer;
