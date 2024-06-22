import PaidIcon from "@mui/icons-material/Paid";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Menu } from "@prisma/client";
import Link from "next/link";

interface Props {
  menu: Menu;
  href: string | object;
  isAvailable?: boolean;
}

const MenuCard = ({ menu, href, isAvailable }: Props) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "20px",
      }}
    >
      <Card
        title={isAvailable === false ? "Unavailable" : ""}
        sx={{
          width: { xs: 130, sm: 220 },
          height: { xs: 130, sm: 220 },
          pb: { xs: 2, sm: 2 },
          m: 1,
          opacity: isAvailable === false ? 0.4 : 1,
        }}
      >
        <CardMedia
          sx={{ height: { xs: 100, sm: 140 }, objectFit: "contain" }}
          image={menu.assetUrl || ""}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 1, sm: 2 },
          }}
        >
          <Typography noWrap sx={{ fontSize: { xs: 16, sm: 18 } }}>
            {menu.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <PaidIcon color="success" />
            <Typography sx={{ m: 0, fontWeight: "bold", fontStyle: "italic" }}>
              {menu.price}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
