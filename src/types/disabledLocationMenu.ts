import { DisabledLocationMenu } from "@prisma/client";

export interface disabledLocationMenuSlice {
  disabledLocationMenu: DisabledLocationMenu[];
  isLoading: boolean;
  error: Error | null;
}
