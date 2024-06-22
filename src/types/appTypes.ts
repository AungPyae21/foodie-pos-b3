import { Location } from "@prisma/client";
import { BasedOptions } from "./userTypes";

export interface appData {
  init: boolean;
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
