import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/AppSnackBarSlice";
import { createMenu } from "@/store/slices/MenuSlice";
import { createMenuPayload } from "@/types/menuType";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useState } from "react";
import MultiSelect from "./MultiSelect";
import FileDrop from "./FileDrop";
import { UploadAsset } from "@/store/slices/AppSlice";

interface Props {
  newMenu: createMenuPayload;
  setNewMenu: React.Dispatch<React.SetStateAction<createMenuPayload>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewMenuDialog = ({ newMenu, setNewMenu, open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { menuCategory } = useAppSelector((state) => state.menuCategory);
  const [menuImage, setMenuImage] = useState<File>();
  const handleCreate = () => {
    const isValid = newMenu.name && newMenu.menuCategoryIds.length > 0;
    if (!isValid) return;

    if (menuImage) {
      dispatch(
        UploadAsset({
          file: menuImage,
          OnSuccess: (assetUrl) => {
            newMenu.assetUrl = assetUrl;
            dispatch(
              createMenu({
                ...newMenu,
                OnSuccess: () => {
                  dispatch(
                    showSnackbar({
                      type: "success",
                      message: "Successfully Menu Added",
                    })
                  );
                  setOpen(false);
                },
                OnError: () => {
                  dispatch(
                    showSnackbar({ type: "error", message: "Error Occured" })
                  );
                },
              })
            );
          },
        })
      );
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Menu</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            type="name"
            label="Name"
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
          ></TextField>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            type="number"
            label="Price"
            onChange={(e) =>
              setNewMenu({ ...newMenu, price: Number(e.target.value) })
            }
          ></TextField>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Menu Category</InputLabel>
            <Select
              multiple
              value={newMenu.menuCategoryIds}
              input={<OutlinedInput label="Menu Category" />}
              onChange={(e) => {
                const selected = e.target.value as number[];
                setNewMenu({ ...newMenu, menuCategoryIds: selected });
              }}
              renderValue={() => {
                const selectedMenuCategory = newMenu.menuCategoryIds.map(
                  (selectedId) => {
                    return menuCategory.find(
                      (item) => item.id == selectedId
                    ) as MenuCategory;
                  }
                );
                return selectedMenuCategory.map((item) => item.name).join(",");
              }}
            >
              {menuCategory.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    <Checkbox
                      checked={newMenu.menuCategoryIds.includes(item.id)}
                    />
                    <ListItemText primary={item.name}></ListItemText>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Box>
            <FileDrop onDrop={(files) => setMenuImage(files[0])} />
            {menuImage && (
              <Chip
                sx={{ mt: 2 }}
                label={menuImage.name}
                onDelete={() => setMenuImage(undefined)}
              />
            )}
          </Box>
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
export default NewMenuDialog;
