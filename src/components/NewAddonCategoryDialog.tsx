import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddonCategoryParam } from "@/types/addonCategory";

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MultiSelect from "./MultiSelect";
import { createAddonCategory } from "@/store/slices/AddonCategorySlice";
import { showSnackbar } from "@/store/slices/AppSnackBarSlice";
import { useRouter } from "next/router";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newAddonCategory: createAddonCategoryParam;
  setNewAddonCategory: Dispatch<SetStateAction<createAddonCategoryParam>>;
}
const NewAddonCategoryDialog = ({
  open,
  setOpen,
  newAddonCategory,
  setNewAddonCategory,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);
  const { menus } = useAppSelector((state) => state.menu);

  useEffect(() => {
    setNewAddonCategory({ ...newAddonCategory, menuId: selected });
  }, [selected]);
  const handleCreate = () => {
    dispatch(
      createAddonCategory({
        ...newAddonCategory,
        OnSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "New Addon Category created successfully",
            })
          );
        },
      })
    );
    setOpen(false);
    router.push("/backoffice/addoncategory");
  };
  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setNewAddonCategory({
            name: "",
            isRequired: true,
            menuId: [],
          });
        }}
      >
        <DialogTitle>New Addon Category</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            type="name"
            placeholder="Name"
            onChange={(e) =>
              setNewAddonCategory({ ...newAddonCategory, name: e.target.value })
            }
          ></TextField>
          <MultiSelect
            title="menu"
            selected={selected}
            setSelected={setSelected}
            items={menus}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={newAddonCategory.isRequired}
                onChange={(evt, value) =>
                  setNewAddonCategory({
                    ...newAddonCategory,
                    isRequired: value,
                  })
                }
              />
            }
            label="IsRequired"
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
export default NewAddonCategoryDialog;
