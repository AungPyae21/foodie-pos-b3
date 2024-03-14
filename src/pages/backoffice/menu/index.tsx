import LayoutBackOffice from "@/components/LayoutBackOffice";
import NewMenuDialog from "@/components/NewMenuDialog";
import { NewMenu } from "@/types/menuType";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [newMenu, setNewMenu] = useState<NewMenu>({ name: "", price: 0 });

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
            New Menu
          </Button>
        </Box>
      </Box>
      <NewMenuDialog
        newMenu={newMenu}
        setNewMenu={setNewMenu}
        open={open}
        setOpen={setOpen}
      />
    </LayoutBackOffice>
  );
};
export default menu;
