import { Table } from "@prisma/client";
import { BasedOptions } from "./userTypes";

export interface TableSlice {
  tables: Table[];
  isLoading: boolean;
  error: null | Error;
}

export interface createTableParam extends BasedOptions {
  name: string;
  locationId: number | undefined;
}
