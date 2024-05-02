import { AddonCategory } from "@prisma/client";
import { BasedOptions } from "./userTypes";

export interface addonCategoryParam {
  addonCategories: AddonCategory[];
  isLoading: boolean;
  error: null | Error;
}
export interface createAddonCategoryParam extends BasedOptions {
  name: string;
  isRequired: boolean;
  menuId: number[];
}
export interface updateAddonCategoryPayload
  extends AddonCategory,
    BasedOptions {
  menuId?: number[];
}

export interface deleteAddonCategoryPayload extends BasedOptions {
  id: number;
}
