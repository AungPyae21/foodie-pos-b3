import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenuCategory {
  name: string;
  id: number;
}
interface MenuCategorySlice {
  menu: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: MenuCategorySlice = {
  menu: [],
  isLoading: false,
  error: null,
};

export const MenuCategorySlice = createSlice({
  name: "MenuCategory",
  initialState,
  reducers: {
    AddMenu: (state, action: PayloadAction<MenuCategory>) => {
      const newMenu = action.payload;
      state.menu = [...state.menu, newMenu];
    },
  },
});

export const { AddMenu } = MenuCategorySlice.actions;
export default MenuCategorySlice.reducer;
