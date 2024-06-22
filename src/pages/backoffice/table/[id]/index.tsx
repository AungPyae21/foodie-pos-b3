import DeleteDialog from "@/components/DeleteDialog";
import { useAppSelector } from "@/store/hooks";
import { tableSelector } from "@/store/slices/TableSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const TableDetails = () => {
  const router = useRouter();
  const tableId = Number(router.query.id);
  const allTables = useAppSelector(tableSelector);
  const table = allTables.find((item) => item.id === tableId);
  const [open, setOpen] = useState<boolean>(false);
  const handleUpdate = () => {};
  if (!table) {
    <Box>
      <Typography>Table is not found</Typography>
    </Box>;
  }
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
          sx={{ color: "red", width: "fit-content" }}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex", width: 450, flexDirection: "column" }}>
        <TextField defaultValue={table?.name}></TextField>
        <Button
          onClick={handleUpdate}
          sx={{ width: "fit-content", mt: 2 }}
          variant="contained"
        >
          Update
        </Button>

        <DeleteDialog
          open={open}
          setOpen={setOpen}
          title="Are you sure to delete this menu?"
          handleDelete={() => {
            setOpen(false);
            router.push("/backoffice/table");
          }}
        />
      </Box>
    </Box>
  );
};

export default TableDetails;
