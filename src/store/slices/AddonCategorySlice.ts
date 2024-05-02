import { config } from "@/config";
import {
  addonCategoryParam,
  createAddonCategoryParam,
  deleteAddonCategoryPayload,
  updateAddonCategoryPayload,
} from "@/types/addonCategory";
import { userInfo } from "@/types/userTypes";
import { AddonCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addMenuAddonCategories,
  setMenuAddonCategories,
} from "./MenuAddonCategorySlice";

const initialState: addonCategoryParam = {
  addonCategories: [],
  isLoading: false,
  error: null,
};

export const createAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategory",
  async (payload: createAddonCategoryParam, thunkAPI) => {
    const { OnSuccess, name, isRequired, menuId } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}addoncategory`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, isRequired, menuId }),
    });
    const dataFromServer = await response.json();
    const { menuAddonCategory, newAddonCategory } = dataFromServer;
    thunkAPI.dispatch(addAddonCategories(newAddonCategory));
    thunkAPI.dispatch(addMenuAddonCategories(menuAddonCategory));
    OnSuccess && OnSuccess();
  }
);
export const updateAddonCategory = createAsyncThunk(
  "addonCategory/updateaddonCategory",
  async (payload: updateAddonCategoryPayload, thunkAPI) => {
    const { OnSuccess } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}addoncategory`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updateAddonCategory, menuAddonCategory } = dataFromServer;
    OnSuccess && OnSuccess();
    thunkAPI.dispatch(setMenuAddonCategories(menuAddonCategory));
    thunkAPI.dispatch(replaceAddonCategory(updateAddonCategory));
  }
);
export const deleteAddonCategory = createAsyncThunk(
  "addonCategory/deleteAddonCategory",
  async (payload: deleteAddonCategoryPayload, thunkAPI) => {
    const { id, OnSuccess } = payload;
    await fetch(`${config.backOfficeBaseUrl}addoncategory?id=${id}`, {
      method: "DELETE",
    });
    thunkAPI.dispatch(removeAddonCategory(id));
    OnSuccess && OnSuccess();
  }
);

export const addonCategorySlice = createSlice({
  name: "addonCategorySlice",
  initialState,
  reducers: {
    setAddonCategories: (state, action: PayloadAction<AddonCategory[]>) => {
      state.addonCategories = action.payload;
    },
    addAddonCategories: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = [...state.addonCategories, action.payload];
    },
    replaceAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = state.addonCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddonCategory: (state, action: PayloadAction<number>) => {
      state.addonCategories = state.addonCategories.filter((addonCategory) =>
        addonCategory.id === action.payload ? false : true
      );
    },
  },
});

export const {
  setAddonCategories,
  addAddonCategories,
  replaceAddonCategory,
  removeAddonCategory,
} = addonCategorySlice.actions;
export default addonCategorySlice.reducer;
