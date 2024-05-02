import { DisabledLocationMenuCategory } from "@prisma/client";

export interface disabledLocationMenuCategorySlice {
  disabledLocationMenuCategory: DisabledLocationMenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
