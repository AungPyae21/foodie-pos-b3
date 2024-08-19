import {
  GetAppDataOptions,
  Theme,
  UploadAssetParam,
  appData,
} from "@/types/appTypes";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddMenu } from "./MenuSlice";
import { SetMenucategory } from "./MenuCategorySlice";
import { setCompany } from "./CompanySlice";
import { config } from "@/config";
import { setMenuCategoryMenu } from "./MenuCategoryMenuSlice";
import { setLocations } from "./locationSlice";
import { Location } from "@prisma/client";
import { setDisabledLocationMenuCategory } from "./DisabledLocationMenuCategorySlice";
import { setDisabledLocationMenu } from "./DisabledLocationMenuSlice";
import { setAddonCategories } from "./AddonCategorySlice";
import { setMenuAddonCategories } from "./MenuAddonCategorySlice";
import { setAddons } from "./AddonSlice";
import { setTables } from "./TableSlice";
import { RootState } from "../store";
import { setOrders } from "./OrderSlice";

const initialState: appData = {
  init: false,
  theme: "light",
  selectedLocation: null,
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (option: GetAppDataOptions, ThunkAPI) => {
    ThunkAPI.dispatch(setIsLoading(true));
    const { tableId } = option;
    const apiUrl = tableId
      ? `${config.orderapiBaseUrl}app?tableId=${tableId}`
      : `${config.backOfficeBaseUrl}app`;
    const response = await fetch(apiUrl);
    const {
      menus,
      menuCategories,
      location,
      company,
      menuAddonCategories,
      addons,
      addonCategories,
      menuCategoryMenus,
      diabledLocationMenu,
      tables,
      orders,
      disabledLocationMenuCategory,
    } = await response.json();

    ThunkAPI.dispatch(AddMenu(menus));
    ThunkAPI.dispatch(SetMenucategory(menuCategories));
    ThunkAPI.dispatch(setMenuCategoryMenu(menuCategoryMenus));
    ThunkAPI.dispatch(setCompany(company));
    ThunkAPI.dispatch(setLocations(location));
    ThunkAPI.dispatch(setAddons(addons));
    ThunkAPI.dispatch(setTables(tables));
    ThunkAPI.dispatch(setOrders(orders));
    ThunkAPI.dispatch(setAddonCategories(addonCategories));
    ThunkAPI.dispatch(setMenuAddonCategories(menuAddonCategories));
    ThunkAPI.dispatch(setDisabledLocationMenu(diabledLocationMenu));
    ThunkAPI.dispatch(
      setDisabledLocationMenuCategory(disabledLocationMenuCategory)
    );
    const selectedLoctionId = localStorage.getItem("selectedLocationId");
    if (selectedLoctionId) {
      const selectedLocation = location.find(
        (item: any) => item.id === Number(selectedLoctionId)
      ) as Location;
      ThunkAPI.dispatch(setSelectedLocation(selectedLocation));
    } else {
      ThunkAPI.dispatch(setSelectedLocation(location[0]));
    }
    ThunkAPI.dispatch(
      setTheme((localStorage.getItem("theme") as Theme) ?? "light")
    );
    ThunkAPI.dispatch(setinit(true));
    ThunkAPI.dispatch(setIsLoading(false));
  }
);

export const UploadAsset = createAsyncThunk(
  "app/UploadAsset",
  async (payload: UploadAssetParam) => {
    const { file, OnSuccess } = payload;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${config.backOfficeBaseUrl}asset`, {
      method: "POST",
      body: formData,
    });
    const dataFromServer = await response.json();
    const { assetUrl } = dataFromServer;
    OnSuccess && OnSuccess(assetUrl);
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setinit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setinit, setSelectedLocation, setIsLoading, setTheme } =
  appSlice.actions;
export const AppDataSelector = (state: RootState) => {
  return {
    app: state.app,
    menus: state.menu.menus,
    menuCategories: state.menuCategory.menuCategory,
    menuCategoryMenus: state.menuCategoryMenu.MenuCategoryMenu,
    menuAddonCategory: state.menuAddonCategory.menuAddonCategories,
    addonCategories: state.addonCategory.addonCategories,
    addons: state.addon.addons,
    orders: state.order.items,
    tables: state.table.tables,
    company: state.company.company,
    location: state.location.locations,
    disabledLocationMenus: state.disabledLocationMenu.disabledLocationMenu,
    disabledLocationMenucategories:
      state.disabledLocationMenuCategory.disabledLocationMenuCategory,
    selectedLocation: state.app.selectedLocation,
  };
};
export default appSlice.reducer;
