import { config } from "@/config";
import {
  UpdateMenuCategoryPayload,
  createMenuCategoryParam,
  deleteMenuCategoryPayload,
} from "@/types/menuCategoryType";
import { MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setDisabledLocationMenuCategory } from "./DisabledLocationMenuCategorySlice";

interface MenuCategorySlice {
  menuCategory: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: MenuCategorySlice = {
  menuCategory: [],
  isLoading: false,
  error: null,
};

export const setMenuCategory = createAsyncThunk(
  "MenuCategory/setMenuCategory",
  async (payload: createMenuCategoryParam, thunkAPI) => {
    const { OnSuccess } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}menucategory`, {});
    const dataFromServer = await response.json();
    const { menuCategory } = dataFromServer;
    thunkAPI.dispatch(SetMenucategory(menuCategory));
    OnSuccess && OnSuccess();
  }
);

export const createMenuCategory = createAsyncThunk(
  "MenuCategory/createMenuCategory",
  async (payload: createMenuCategoryParam, thunkAPI) => {
    const { OnSuccess } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}menucategory`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { menuCategory } = dataFromServer;
    thunkAPI.dispatch(AddMenuCategory(menuCategory));
    OnSuccess && OnSuccess();
  }
);
export const deleteMenuCategory = createAsyncThunk(
  "MenuCategory/deleteMenuCategory",
  async (payload: deleteMenuCategoryPayload, thunkAPI) => {
    const { id, OnSuccess } = payload;
    await fetch(`${config.backOfficeBaseUrl}menucategory?id=${id}`, {
      method: "DELETE",
    });
    OnSuccess && OnSuccess();
    thunkAPI.dispatch(RemoveMenuCategory(id));
  }
);

export const UpdateMenuCategory = createAsyncThunk(
  "MenuCategory/updateMenuCategory",
  async (payload: UpdateMenuCategoryPayload, thunkAPI) => {
    const { OnSuccess } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}menucategory`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updateMenuCategory, disabledLocationMenuCategory } = dataFromServer;
    OnSuccess && OnSuccess();
    thunkAPI.dispatch(ReplaceMenuCategory(updateMenuCategory));
    thunkAPI.dispatch(
      setDisabledLocationMenuCategory(disabledLocationMenuCategory)
    );
  }
);

export const MenuCategorySlice = createSlice({
  name: "MenuCategory",
  initialState,
  reducers: {
    SetMenucategory: (state, action: PayloadAction<MenuCategory>) => {
      //@ts-ignore
      state.menuCategory = action.payload;
    },
    AddMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategory = [...state.menuCategory, action.payload];
    },
    ReplaceMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategory = state.menuCategory.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    RemoveMenuCategory: (state, action: PayloadAction<number>) => {
      state.menuCategory = state.menuCategory.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
  },
});

export const {
  AddMenuCategory,
  SetMenucategory,
  ReplaceMenuCategory,
  RemoveMenuCategory,
} = MenuCategorySlice.actions;
export default MenuCategorySlice.reducer;
