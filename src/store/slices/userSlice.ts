import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface BasedOptions {
  OnSuccess?: (data?: any) => void;
  OnError?: (error?: any) => void;
}

interface userInfo extends BasedOptions {
  email: string;
  password: string;
}

interface User {
  user: userInfo[];
  isLoading: boolean;
  error: null | Error;
}
const initialState: User = {
  user: [],
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUser: (state, action) => {
      const newUser = action.payload;
      state.user = [...state.user, newUser];
    },
  },
});

export const { AddUser } = userSlice.actions;
export default userSlice.reducer;
