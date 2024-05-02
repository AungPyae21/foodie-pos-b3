import { BasedOptions } from "./userTypes";

export interface createMenuCategoryParam extends BasedOptions {
  name: string;
  isAvailable: boolean;
  companyId?: number;
}

export interface UpdateMenuCategoryPayload extends BasedOptions {
  id: number;
  name?: string;
  isAvailable?: boolean;
  locationId?: number;
}

export interface deleteMenuCategoryPayload extends BasedOptions {
  id: number;
}
