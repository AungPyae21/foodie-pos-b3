import { MenuCategoryMenuSlice } from "@/types/menuCategoryMenuType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategoryMenuSlice = {
  MenuCategoryMenu: [],
  isLoading: false,
  error: null,
};

export const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenu: (state, action) => {
      state.MenuCategoryMenu = action.payload;
    },
  },
});

export const { setMenuCategoryMenu } = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
