import { disabledLocationMenuSlice } from "@/types/disabledLocationMenu";
import { DisabledLocationMenu } from "@prisma/client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: disabledLocationMenuSlice = {
  disabledLocationMenu: [],
  isLoading: false,
  error: null,
};

export const DisabledLocationMenuSlice = createSlice({
  name: "disabledLocationMenu",
  initialState,
  reducers: {
    setDisabledLocationMenu: (
      state,
      action: PayloadAction<DisabledLocationMenu[]>
    ) => {
      state.disabledLocationMenu = action.payload;
    },
  },
});

export const { setDisabledLocationMenu } = DisabledLocationMenuSlice.actions;
export default DisabledLocationMenuSlice.reducer;
