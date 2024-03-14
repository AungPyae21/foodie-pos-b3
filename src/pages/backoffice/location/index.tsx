import LayoutBackOffice from "@/components/LayoutBackOffice";
import NewLocationDialog from "@/components/NewLocationDialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Location = () => {
  const [open, setOpen] = useState(false);
  return (
    <LayoutBackOffice>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#265073", "&:hover": { bgcolor: "#236193" } }}
            onClick={() => setOpen(true)}
          >
            New Location
          </Button>
        </Box>
      </Box>
      <NewLocationDialog open={open} setOpen={setOpen} />
    </LayoutBackOffice>
  );
};
export default Location;
