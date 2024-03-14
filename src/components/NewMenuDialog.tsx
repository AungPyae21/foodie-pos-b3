import { NewMenu } from "@/types/menuType";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Props {
  newMenu: NewMenu;
  setNewMenu: React.Dispatch<React.SetStateAction<NewMenu>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewMenuDialog = ({ newMenu, setNewMenu, open, setOpen }: Props) => {
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Menu</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            type="name"
            placeholder="Name"
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
          ></TextField>
          <TextField
            sx={{ width: "100%" }}
            type="number"
            placeholder="Price"
            onChange={(e) =>
              setNewMenu({ ...newMenu, price: Number(e.target.value) })
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
            onClick={() => {}}
          >
            create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default NewMenuDialog;
