import LayoutBackOffice from "@/components/LayoutBackOffice";
import NewAddonDialog from "@/components/NewAddonDialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Addon = () => {
  const [open, setOpen] = useState<boolean>(false);
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
            New Add-on
          </Button>
        </Box>
      </Box>
      <NewAddonDialog open={open} setOpen={setOpen} />
    </LayoutBackOffice>
  );
};
export default Addon;
