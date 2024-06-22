import { useRouter } from "next/router";
import LayoutBackOffice from "./LayoutBackOffice";
import { ReactNode } from "react";
import OrderAppLayout from "./OrderAppLayout";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { tableId } = router.query;
  const isOrderApp = tableId;
  const isBackOffice = pathname.includes("backoffice");
  if (isBackOffice) {
    return <LayoutBackOffice>{children}</LayoutBackOffice>;
  }
  if (isOrderApp) {
    return <OrderAppLayout>{children}</OrderAppLayout>;
  }
  return <Box>{children}</Box>;
};

export default Layout;
