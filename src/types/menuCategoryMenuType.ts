import { MenuCategoryMenu } from "@prisma/client";

export interface MenuCategoryMenuSlice {
  MenuCategoryMenu: MenuCategoryMenu[];
  isLoading: Boolean;
  error: Error | null;
}
