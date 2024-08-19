import { Addon, Menu, ORDERSTATUS, Table } from "@prisma/client";
import { CartItem } from "./cart";
import { BasedOptions } from "./userTypes";

export interface CreateOrderOptions extends BasedOptions {
  tableId: number;
  cartItems: CartItem[];
}

export interface UpdateOrderOptions extends BasedOptions {
  itemId: string;
  status: ORDERSTATUS;
}

export interface RefreshOrderOptions extends BasedOptions {
  orderSeq: string;
}

export interface OrderAddon {
  addonCategoryId: number;
  addons: Addon[];
}

export interface OrderItem {
  itemId: string;
  status: ORDERSTATUS;
  orderAddons: OrderAddon[];
  menu: Menu;
  table: Table;
}
