import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  handleDelete: () => void;
}

const DeleteDialog = ({ open, setOpen, title, handleDelete }: Props) => {
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>{title}</DialogContent>
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
            onClick={handleDelete}
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default DeleteDialog;
