import { menuAddonCategory } from "@/types/menuAddonCategory";
import { userInfo } from "@/types/userTypes";
import { MenuAddonCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: menuAddonCategory = {
  menuAddonCategories: [],
  isLoading: false,
  error: null,
};

export const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategorySlice",
  initialState,
  reducers: {
    setMenuAddonCategories: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.menuAddonCategories = action.payload;
    },
    addMenuAddonCategories: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.menuAddonCategories = [
        ...state.menuAddonCategories,
        ...action.payload,
      ];
    },
  },
});

export const { setMenuAddonCategories, addMenuAddonCategories } =
  menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;
