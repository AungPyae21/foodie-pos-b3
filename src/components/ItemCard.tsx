import { Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  href: string;
  isDisabled?: boolean;
  subtitle?: string;
}

const ItemCard = ({ icon, title, href, subtitle, isDisabled }: Props) => {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "#000000" }}>
      <Paper
        elevation={2}
        sx={{
          width: 170,
          height: 170,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
          opacity: isDisabled ? 0.4 : 1,
          cursor: "pointer",
        }}
      >
        {icon}
        <Typography sx={{ fontWeight: "700" }}>{title}</Typography>
        {subtitle && <Typography sx={{ fontSize: 14 }}>{subtitle}</Typography>}
      </Paper>
    </Link>
  );
};

export default ItemCard;
