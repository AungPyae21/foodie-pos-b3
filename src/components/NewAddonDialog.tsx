import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddonCategory } from "@/store/slices/AddonCategorySlice";
import { createAddonParam } from "@/types/addon";
import {
  Box,
  Button,
  DialogContent,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItem,
  OutlinedInput,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SingleSelect from "./SingleSelect";
import { createAddon } from "@/store/slices/AddonSlice";
import { showSnackbar } from "@/store/slices/AppSnackBarSlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newAddon: createAddonParam;
  setNewAddon: Dispatch<SetStateAction<createAddonParam>>;
}
const NewAddonDialog = ({ open, setOpen, newAddon, setNewAddon }: Props) => {
  const dispatch = useAppDispatch();
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const [selected, setSelected] = useState<number>();
  const handleCreate = () => {
    dispatch(
      createAddon({
        ...newAddon,
        OnSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "Successfully Addon Created",
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
  useEffect(() => {
    setNewAddon({ ...newAddon, addonCategoryId: selected });
  }, [selected]);
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Add on</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <TextField
            type="text"
            placeholder="Name"
            sx={{ width: "100%", mb: 2 }}
            onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
          />
          <TextField
            type="number"
            label="Price"
            sx={{ width: "100%", mb: 2 }}
            onChange={(e) =>
              setNewAddon({ ...newAddon, price: Number(e.target.value) })
            }
          />
          <SingleSelect
            items={addonCategories}
            title="Addon Category"
            selected={selected}
            setSelected={setSelected}
          />
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
export default NewAddonDialog;
