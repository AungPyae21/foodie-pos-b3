import { Location } from "@prisma/client";
import { BasedOptions } from "./userTypes";

export interface LocationSlice extends BasedOptions {
  locations: Location[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateLocationPayload extends BasedOptions {
  name: string;
  street: string;
  township: string;
  city: string;
  companyId?: number;
}
export interface UpdateLocationPayload extends Location, BasedOptions {}

export interface deleteLocationPayload extends BasedOptions {
  id: number;
}
