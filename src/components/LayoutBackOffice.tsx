import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import AppSnackBar from "./AppSnackBar";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/AppSlice";

interface Props {
  children: ReactNode;
}
const LayoutBackOffice = ({ children }: Props) => {
  const { init } = useAppSelector((state) => state.app);
  const { data } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData());
    }
  }, []);
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
