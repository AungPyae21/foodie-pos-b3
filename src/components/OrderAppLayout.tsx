import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/AppSlice";
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
  const { tableId } = router.query;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tableId && !init) {
      dispatch(fetchAppData({ tableId: Number(tableId) }));
    }
  }, [tableId]);
  return (
    <Box>
      <OrderAppHeader />
      <Box>{children}</Box>
      <OrderAppFooter />
    </Box>
  );
};

export default OrderAppLayout;
