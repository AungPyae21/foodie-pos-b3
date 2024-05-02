import { appData } from "@/types/appTypes";
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

const initialState: appData = {
  init: false,
  selectedLocation: null,
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (_, ThunkAPI) => {
    ThunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(`${config.backOfficeBaseUrl}/app`);
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
      disabledLocationMenuCategory,
    } = await response.json();

    ThunkAPI.dispatch(AddMenu(menus));
    ThunkAPI.dispatch(SetMenucategory(menuCategories));
    ThunkAPI.dispatch(setMenuCategoryMenu(menuCategoryMenus));
    ThunkAPI.dispatch(setCompany(company));
    ThunkAPI.dispatch(setLocations(location));
    ThunkAPI.dispatch(setAddons(addons));
    ThunkAPI.dispatch(setTables(tables));
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
    ThunkAPI.dispatch(setinit(true));
    ThunkAPI.dispatch(setIsLoading(false));
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
  },
});

export const { setinit, setSelectedLocation, setIsLoading } = appSlice.actions;
export default appSlice.reducer;
