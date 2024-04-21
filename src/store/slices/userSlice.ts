import { userInfo } from "@/types/userTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
