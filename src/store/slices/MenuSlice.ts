import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BasedOption {
  OnSuccess?: (data?: any) => void;
  OnError?: (Error?: any) => void;
}

interface Menu extends BasedOption {
  name: string;
  price: number;
}
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
  async (newMenu: Menu) => {
    // newMenu.OnError && newMenu.OnError();
    // throw new Error("asdf");
    const { OnSuccess, ...par } = newMenu;

    const response = await fetch("http://localhost:5000/menu", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...newMenu }),
    });
    const dataFromServer = await response.json();

    //ThunkAPI.dispatch(AddMenu(menus));
    OnSuccess && OnSuccess();
    return dataFromServer;
  }
);

export const menuSlice = createSlice({
  name: "Menu",
  initialState,
  reducers: {
    AddMenu: (state, action: PayloadAction<Menu>) => {
      const newMenu = action.payload;
      state.menus = [...state.menus, newMenu];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menus = action.payload;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = new Error("createMenus error occured");
      });
  },
});

export const { AddMenu } = menuSlice.actions;
export default menuSlice.reducer;
