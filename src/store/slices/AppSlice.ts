import { appData } from "@/types/appTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddMenu } from "./MenuSlice";
import { SetMenucategory } from "./MenuCategorySlice";
import { setCompany } from "./CompanySlice";
import { config } from "@/config";
import { setMenuCategoryMenu } from "./MenuCategoryMenuSlice";

const initialState: appData = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (_, ThunkAPI) => {
    const response = await fetch(`${config.backOfficeBaseUrl}/app`);
    const { menus, menuCategories, company, menuCategoryMenus } =
      await response.json();
    ThunkAPI.dispatch(AddMenu(menus));
    ThunkAPI.dispatch(SetMenucategory(menuCategories));
    ThunkAPI.dispatch(setMenuCategoryMenu(menuCategoryMenus));
    ThunkAPI.dispatch(setCompany(company));
    ThunkAPI.dispatch(setinit());
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setinit: (state) => {
      state.init = true;
    },
  },
});

export const { setinit } = appSlice.actions;
export default appSlice.reducer;
