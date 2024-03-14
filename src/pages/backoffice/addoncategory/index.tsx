import LayoutBackOffice from "@/components/LayoutBackOffice";
import NewAddonCategoryDialog from "@/components/NewAddonCategoryDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const AddonCategory = () => {
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
            New Add-on Category
          </Button>
        </Box>
      </Box>
      <NewAddonCategoryDialog open={open} setOpen={setOpen} />
    </LayoutBackOffice>
  );
};
export default AddonCategory;
