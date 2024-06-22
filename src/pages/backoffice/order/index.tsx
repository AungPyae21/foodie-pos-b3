import { Box, Typography } from "@mui/material";

const Order = () => {
  return (
    <Box>
      <Box
        sx={{
          width: 400,
          height: 300,
          bgcolor: { xs: "yellow", sm: "green", md: "yellowgreen" },
        }}
      ></Box>
      <Typography variant="h2">order</Typography>
    </Box>
  );
};
export default Order;
