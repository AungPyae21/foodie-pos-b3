import { configureStore } from "@reduxjs/toolkit";
import MenuSlice from "./slices/MenuSlice";
import MenuCategorySlice from "./slices/MenuCategorySlice";
import userSlice from "./slices/userSlice";
import AppSnackBarReducer from "./slices/AppSnackBarSlice";
import AppSlice from "./slices/AppSlice";
import CompanySlice from "./slices/CompanySlice";
import menuCategoryMenuSlice from "./slices/MenuCategoryMenuSlice";

export const store = configureStore({
  reducer: {
    app: AppSlice,
    menu: MenuSlice,
    menuCategory: MenuCategorySlice,
    menuCategoryMenu: menuCategoryMenuSlice,
    company: CompanySlice,
    user: userSlice,
    snackBar: AppSnackBarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
