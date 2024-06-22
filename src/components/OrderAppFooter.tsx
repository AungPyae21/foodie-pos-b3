import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { useRouter } from "next/router";

const OrderAppFooter = () => {
  const router = useRouter();
  const isActiveOrderPage = router.pathname.includes("active-order");
  const orders = useAppSelector((state) => state.order.items);
  const showActiveOrderFooterBar =
    !isActiveOrderPage &&
    orders.length > 0 &&
    orders.some(
      (item) =>
        item.status === ORDERSTATUS.COOKING ||
        item.status === ORDERSTATUS.PENDING
    );
  if (!showActiveOrderFooterBar) return null;
  return (
    <Box
      sx={{
        height: 50,
        width: "100vw",
        bgcolor: "primary.main",
        position: "fixed",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        cursor: "pointer",
        zIndex: 5,
      }}
      onClick={() =>
        router.push({
          pathname: `/order/active-order/${orders[0].orderSeq}`,
          query: router.query,
        })
      }
    >
      <Typography sx={{ color: "secondary.main", userSelect: "none" }}>
        You have active order. Click here to view.
      </Typography>
    </Box>
  );
};

export default OrderAppFooter;
