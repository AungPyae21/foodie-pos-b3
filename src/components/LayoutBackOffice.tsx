import { Box } from "@mui/material";
import { ReactNode } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import AppSnackBar from "./AppSnackBar";

interface Props {
  children: ReactNode;
}
const LayoutBackOffice = ({ children }: Props) => {
  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box
          sx={{
            p: 3,

            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
      <AppSnackBar />
    </Box>
  );
};
export default LayoutBackOffice;
