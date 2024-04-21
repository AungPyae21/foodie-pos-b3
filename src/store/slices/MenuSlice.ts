import { config } from "@/config";
import { createMenuPayload, deleteMenuPayload } from "@/types/menuType";
import { Menu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fstat } from "fs";
interface BasedOption {
  OnSuccess?: (data?: any) => void;
  OnError?: (Error?: any) => void;
}

// interface Menu extends BasedOption {
//   name: string;
//   price: number;
// }
interface Props {
  menus: Menu[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: Props = {
  menus: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "Menu/createMenu",
  async (payload: createMenuPayload) => {
    // newMenu.OnError && newMenu.OnError();
    // throw new Error("asdf");
    const { OnSuccess } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}menu`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...payload }),
    });
    const { menu, menuCategoryMenus } = await response.json();
    //ThunkAPI.dispatch(AddMenu(menus));
    OnSuccess && OnSuccess();
    return menu;
  }
);

export const deleteMenu = createAsyncThunk(
  "Menu/createMenu",
  async (payload: deleteMenuPayload, thunkAPI) => {
    const { id, OnSuccess } = payload;
    await fetch(`${config.backOfficeBaseUrl}menu?id=${id}`, {
      method: "DELETE",
    });
    thunkAPI.dispatch(RemoveMenu(id));
    OnSuccess && OnSuccess();
  }
);

export const menuSlice = createSlice({
  name: "Menu",
  initialState,
  reducers: {
    AddMenu: (state, action: PayloadAction<Menu>) => {
      const newMenu = action.payload;
      //@ts-ignore
      state.menus = newMenu;
    },
    RemoveMenu: (state, action: PayloadAction<number>) => {
      state.menus = state.menus.filter((menu) =>
        menu.id === action.payload ? false : true
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menus = [...state.menus, action.payload];
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = new Error("createMenus error occured");
      });
  },
});

export const { AddMenu, RemoveMenu } = menuSlice.actions;
export default menuSlice.reducer;
