import LayoutBackOffice from "@/components/LayoutBackOffice";
import NewTableDialog from "@/components/NewTableDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Table = () => {
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
            New Table
          </Button>
        </Box>
      </Box>
      <NewTableDialog open={open} setOpen={setOpen} />
    </LayoutBackOffice>
  );
};
export default Table;
