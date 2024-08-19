import { Location } from "@prisma/client";
import { BasedOptions } from "./userTypes";

export type Theme = "light" | "dark";
export interface appData {
  init: boolean;
  theme: Theme;
  selectedLocation: Location | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UploadAssetParam extends BasedOptions {
  file: File;
}
export interface GetAppDataOptions {
  tableId?: number;
}
