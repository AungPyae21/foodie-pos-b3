import LayoutBackOffice from "@/components/LayoutBackOffice";
import NewMenuCategoryDialog from "@/components/NewMenuCategoryDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const MenuCategory = () => {
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
            New Menu Category
          </Button>
        </Box>
      </Box>
      <NewMenuCategoryDialog open={open} setOpen={setOpen} />
    </LayoutBackOffice>
  );
};
export default MenuCategory;
