import { Addon } from "@prisma/client";
import { BasedOptions } from "./userTypes";

export interface AddonSlice {
  addons: Addon[];
  isLoading: boolean;
  error: Error | null;
}

export interface createAddonParam extends BasedOptions {
  name: string;
  price: number;
  addonCategoryId: number | undefined;
}

export interface updateAddonParam extends BasedOptions {
  name: string;
  price: number;
  addonCategoryId: number;
}

export interface deleteAddonPayload extends BasedOptions {
  id: number;
}
