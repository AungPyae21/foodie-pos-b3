import { disabledLocationMenuCategorySlice } from "@/types/disabledLocationMenuuCategory";
import { DisabledLocationMenuCategory } from "@prisma/client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: disabledLocationMenuCategorySlice = {
  disabledLocationMenuCategory: [],
  isLoading: false,
  error: null,
};

export const DisabledLocationMenuCategorySlice = createSlice({
  name: "disabledLocationMennuCategory",
  initialState,
  reducers: {
    setDisabledLocationMenuCategory: (
      state,
      action: PayloadAction<DisabledLocationMenuCategory[]>
    ) => {
      state.disabledLocationMenuCategory = action.payload;
    },
  },
});

export const { setDisabledLocationMenuCategory } =
  DisabledLocationMenuCategorySlice.actions;
export default DisabledLocationMenuCategorySlice.reducer;
