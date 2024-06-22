import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AppDataSelector, fetchAppData } from "@/store/slices/AppSlice";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";
import OrderAppFooter from "./OrderAppFooter";
interface Props {
  children: ReactNode;
}
const OrderAppLayout = ({ children }: Props) => {
  const { init } = useAppSelector((state) => state.app);
  const router = useRouter();
  const tableId = Number(router.query);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (init === false) {
      dispatch(fetchAppData({ tableId: tableId }));
    }
  }, []);
  return (
    <Box>
      <OrderAppHeader />
      <Box>{children}</Box>
      <OrderAppFooter />
    </Box>
  );
};

export default OrderAppLayout;
