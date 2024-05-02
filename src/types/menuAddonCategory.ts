import { MenuAddonCategory } from "@prisma/client";
import { BasedOptions } from "./userTypes";

export interface menuAddonCategory {
  menuAddonCategories: MenuAddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
