import { Typography, Box } from "@mui/material";
import { useSession } from "next-auth/react";

const BackOffice = () => {
  const { data } = useSession();

  return (
    <Box>
      <Box>
        <Typography variant="h3">
          Backoffice App "{data?.user?.email}"
        </Typography>
      </Box>
    </Box>
  );
};

export default BackOffice;
