import { Menu } from "@prisma/client";
import { BasedOptions } from "./userTypes";

export interface createMenuPayload extends BasedOptions {
  name: string;
  price: number;
  assetUrl?: string;
  menuCategoryIds: number[];
}

export interface updateMenuPayload extends Menu, BasedOptions {
  locationId?: number;
  isAvaliable?: boolean;
  menuCategoryIds?: number[];
}

export interface deleteMenuPayload extends BasedOptions {
  id: number;
}
