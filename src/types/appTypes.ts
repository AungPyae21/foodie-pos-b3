import { Location } from "@prisma/client";

export interface appData {
  init: boolean;
  selectedLocation: Location | null;
  isLoading: boolean;
  error: Error | null;
}
