import { companySlice } from "@/types/companyType";
import { Company } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: companySlice = {
  company: null,
  isLoading: false,
  error: null,
};
export const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = CompanySlice.actions;
export default CompanySlice.reducer;
