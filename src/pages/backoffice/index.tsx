import LayoutBackOffice from "@/components/LayoutBackOffice";
import { Typography, Box } from "@mui/material";
import { useSession } from "next-auth/react";

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
