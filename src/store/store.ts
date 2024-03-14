import { configureStore } from "@reduxjs/toolkit";
import MenuSlice from "./slices/MenuSlice";
import MenuCategorySlice from "./slices/MenuCategory";
import userSlice from "./slices/userSlice";
import AppSnackBarReducer from "./slices/AppSnackBarSlice";

export const store = configureStore({
  reducer: {
    menu: MenuSlice,
    menuCategory: MenuCategorySlice,
    user: userSlice,
    snackBar: AppSnackBarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
