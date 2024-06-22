import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./slices/MenuSlice";
import MenuCategoryReducer from "./slices/MenuCategorySlice";
import userReducer from "./slices/userSlice";
import AppSnackBarReducer from "./slices/AppSnackBarSlice";
import AppReducer from "./slices/AppSlice";
import CompanyReducer from "./slices/CompanySlice";
import menuCategoryMenuReducer from "./slices/MenuCategoryMenuSlice";
import locationReducer from "./slices/locationSlice";
import DisabledLocationMenuCategoryReducer from "./slices/DisabledLocationMenuCategorySlice";
import DisabledLocationMenuReducer from "./slices/DisabledLocationMenuSlice";
import AddonCategoryReducer from "./slices/AddonCategorySlice";
import MenuAddonCategoryReducer from "./slices/MenuAddonCategorySlice";
import AddonReducer from "./slices/AddonSlice";
import TableReducer from "./slices/TableSlice";
import OrderReducer from "./slices/OrderSlice";
import CartReducer from "./slices/CartSlice";

export const store = configureStore({
  reducer: {
    app: AppReducer,
    menu: MenuReducer,
    menuCategory: MenuCategoryReducer,
    menuCategoryMenu: menuCategoryMenuReducer,
    addonCategory: AddonCategoryReducer,
    menuAddonCategory: MenuAddonCategoryReducer,
    addon: AddonReducer,
    disabledLocationMenuCategory: DisabledLocationMenuCategoryReducer,
    disabledLocationMenu: DisabledLocationMenuReducer,
    table: TableReducer,
    company: CompanyReducer,
    location: locationReducer,
    user: userReducer,
    snackBar: AppSnackBarReducer,
    order: OrderReducer,
    cart: CartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
