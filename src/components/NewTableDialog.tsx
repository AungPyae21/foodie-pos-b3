import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/AppSnackBarSlice";
import { createTable } from "@/store/slices/TableSlice";
import { createTableParam } from "@/types/table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newTable: createTableParam;
  setNewTable: Dispatch<SetStateAction<createTableParam>>;
}
const NewTableDialog = ({ open, setOpen, newTable, setNewTable }: Props) => {
  const dispatch = useAppDispatch();
  const locationId = useAppSelector((state) => state.app.selectedLocation?.id);
  const handleCreate = () => {
    dispatch(
      createTable({
        ...newTable,
        OnSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "Table Creation operation success",
            })
          );
          setOpen(false);
        },
        OnError: () => {
          dispatch(showSnackbar({ type: "error", message: "Error Occured" }));
        },
      })
    );
  };
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Table</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <TextField
            sx={{ mb: 2, width: "100%" }}
            type="text"
            label="name"
            onChange={(eve) =>
              setNewTable({ ...newTable, name: eve.target.value })
            }
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            sx={{ color: "#265073" }}
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#265073", "&:hover": { bgcolor: "#236193" } }}
            onClick={handleCreate}
          >
            create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default NewTableDialog;
