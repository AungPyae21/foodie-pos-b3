import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SnackBarType = "error" | "success";
interface AppSnackBarSlice {
  type: SnackBarType;
  open: boolean;
  message: string;
}

const initialState: AppSnackBarSlice = {
  type: "success",
  open: false,
  message: "",
};
export const AppSnackBar = createSlice({
  name: "AppSnackBar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ type: SnackBarType; message: string }>
    ) => {
      const { type, message } = action.payload;
      state.open = true;
      state.type = type;
      state.message = message;
    },
    hideSnackBar: (state) => {
      state.open = false;
      state.type = "success";
      state.message = "";
    },
  },
});

export const { showSnackbar, hideSnackBar } = AppSnackBar.actions;
export default AppSnackBar.reducer;
