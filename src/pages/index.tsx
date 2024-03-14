import { Box, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <Box>
      <Typography variant="h1">Home</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">
          <Link href="/backoffice">BackOffice</Link>
        </Typography>
        <Typography variant="h4">
          <Link href="/order">OrderApp</Link>
        </Typography>
      </Box>
    </Box>
  );
};
export default Home;
