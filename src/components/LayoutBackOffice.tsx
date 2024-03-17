import { Box } from "@mui/material";
import { ReactNode } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import AppSnackBar from "./AppSnackBar";
import { useSession } from "next-auth/react";

interface Props {
  children: ReactNode;
}
const LayoutBackOffice = ({ children }: Props) => {
  const { data } = useSession();
  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex" }}>
        {data && <SideBar />}
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
