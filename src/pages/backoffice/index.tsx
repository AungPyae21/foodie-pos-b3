import LayoutBackOffice from "@/components/LayoutBackOffice";
import { Typography, Box, Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

const BackOffice = () => {
  const { data } = useSession();
  return (
    <LayoutBackOffice>
      <Box>
        <Typography variant="h3">
          Backoffice App "{data?.user?.email}"
        </Typography>
      </Box>
    </LayoutBackOffice>
  );
};

export default BackOffice;
