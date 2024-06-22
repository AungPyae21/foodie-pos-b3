import { Addon, Menu } from "@prisma/client";

export interface CartItem {
  id: string;
  menu: Menu;
  addons: Addon[];
  quantity: number;
}

export interface CartSlice {
  isLoading: boolean;
  items: CartItem[];
  error: Error | null;
}
