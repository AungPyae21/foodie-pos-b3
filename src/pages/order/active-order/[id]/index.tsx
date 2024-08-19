import OrderCard from "@/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AppDataSelector } from "@/store/slices/AppSlice";
import { refreshOrder } from "@/store/slices/OrderSlice";
import { formatOrders } from "@/utils/generals";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";

const ActiveOrder = () => {
  const router = useRouter();
  const orderSeq = router.query.id;
  const { addons, menus, orders, tables } = useAppSelector(
    AppDataSelector,
    shallowEqual
  );
  const orderItems = formatOrders(orders, addons, menus, tables);
  const tableId = Number(router.query.tableId);
  const table = tables.find((table) => table.id === tableId);
  const dispatch = useAppDispatch();
  let intervalId: number;
  useEffect(() => {
    if (orderSeq) {
      intervalId = window.setInterval(handleRefreshOrder, 10000);
    }
    return () => {
      window.clearInterval(intervalId);
    };
  }, [orderSeq]);

  const handleRefreshOrder = () => {
    dispatch(refreshOrder({ orderSeq: String(orderSeq) }));
  };

  if (!orders.length) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 3,
          borderRadius: 15,
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          top: { xs: -100, md: -100, lg: -50 },
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontSize: { xs: 20, md: 25 },
          }}
        >
          Table: {table?.name}
        </Typography>
        <Typography
          sx={{
            color: "black",
            fontSize: { xs: 20, md: 25 },
          }}
        >
          Total price: {orders[0].totalPrice}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          top: { md: -50 },
        }}
      >
        {orderItems.map((orderItem) => {
          return (
            <OrderCard
              key={orderItem.itemId}
              orderItem={orderItem}
              isAdmin={false}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default ActiveOrder;
