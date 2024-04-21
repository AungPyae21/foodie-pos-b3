import { Company } from "@prisma/client";
export interface companySlice {
  company: Company | null;
  isLoading: Boolean;
  error: Error | null;
}
