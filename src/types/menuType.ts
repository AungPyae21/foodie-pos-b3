import { Menu } from "@prisma/client";
import { BasedOptions } from "./userTypes";

export interface createMenuPayload extends BasedOptions {
  name: string;
  price: number;
  menuCategoryIds: number[];
}

export interface deleteMenuPayload extends BasedOptions {
  id: number;
}
