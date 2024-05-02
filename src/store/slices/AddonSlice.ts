import { config } from "@/config";
import {
  AddonSlice,
  createAddonParam,
  deleteAddonPayload,
  updateAddonParam,
} from "@/types/addon";
import { Addon } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AddonSlice = {
  addons: [],
  isLoading: false,
  error: null,
};
export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (payload: createAddonParam, thunkAPI) => {
    const { OnSuccess } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}addon`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newAddon } = dataFromServer;
    thunkAPI.dispatch(addAddon(newAddon));
    OnSuccess && OnSuccess();
  }
);
export const updateAddon = createAsyncThunk(
  "addon/updateAddon",
  async (payload: updateAddonParam, thunkAPI) => {
    const { OnSuccess } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}addon`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updateAddon } = dataFromServer;
    thunkAPI.dispatch(replaceAddon(updateAddon));
    OnSuccess && OnSuccess();
  }
);
export const deleteAddon = createAsyncThunk(
  "addon/deleteAddon",
  async (payload: deleteAddonPayload, thunkAPI) => {
    const { id, OnSuccess } = payload;
    await fetch(`${config.backOfficeBaseUrl}addon?id=${id}`, {
      method: "DELETE",
    });
    thunkAPI.dispatch(removeAddon(id));
    OnSuccess && OnSuccess();
  }
);
export const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addon[]>) => {
      state.addons = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = [...state.addons, action.payload];
    },
    replaceAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = state.addons.map((addon) =>
        addon.id === action.payload.id ? action.payload : addon
      );
    },
    removeAddon: (state, action: PayloadAction<number>) => {
      state.addons = state.addons.filter((addon) =>
        addon.id === action.payload ? false : true
      );
    },
  },
});

export const { setAddons, replaceAddon, addAddon, removeAddon } =
  addonSlice.actions;
export default addonSlice.reducer;
