import { config } from "@/config";
import {
  CreateLocationPayload,
  LocationSlice,
  deleteLocationPayload,
} from "@/types/locationType";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: LocationSlice = {
  locations: [],
  isLoading: false,
  error: null,
};
export const createLocation = createAsyncThunk(
  "locationslice/createLocation",
  async (payload: CreateLocationPayload, thunkAPI) => {
    const { OnSuccess } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}location?id`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { location } = dataFromServer;
    OnSuccess && OnSuccess();
    thunkAPI.dispatch(addLocation(location));
  }
);
export const updateLocation = createAsyncThunk(
  "locationslice/updateLocation",
  async (payload: CreateLocationPayload, thunkAPI) => {
    const { OnSuccess } = payload;
    const response = await fetch(`${config.backOfficeBaseUrl}location?id`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { location } = dataFromServer;
    OnSuccess && OnSuccess();
    thunkAPI.dispatch(replaceLocation(location));
  }
);
export const deleteLocation = createAsyncThunk(
  "locationslice/deleteLocation",
  async (payload: deleteLocationPayload, thunkAPI) => {
    const { id, OnSuccess } = payload;
    await fetch(`${config.backOfficeBaseUrl}location?id=${id}`, {
      method: "DELETE",
    });
    OnSuccess && OnSuccess();
    thunkAPI.dispatch(removeLocation(id));
  }
);
export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations = [...state.locations, action.payload];
    },
    removeLocation: (state, action: PayloadAction<number>) => {
      state.locations = state.locations.filter((location) =>
        location.id === action.payload ? false : true
      );
    },
    replaceLocation: (state, action: PayloadAction<Location>) => {
      state.locations = state.locations.map((param) =>
        param.id === action.payload.id ? action.payload : param
      );
    },
  },
});

export const { setLocations, removeLocation, addLocation, replaceLocation } =
  locationSlice.actions;
export default locationSlice.reducer;
