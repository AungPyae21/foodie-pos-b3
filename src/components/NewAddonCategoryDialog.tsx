import { useAppSelector } from "@/store/hooks";

import {
  Box,
  Button,
  Checkbox,
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
  Typography,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewAddonCategoryDialog = ({ open, setOpen }: Props) => {
  const [selected, setSelected] = useState<Number[]>([]);
  const { menuCategory } = useAppSelector((state) => state.menuCategory);
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Addon Category</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>MenuCategory</InputLabel>
            <Select
              input={<OutlinedInput label="menuCategory" />}
              value={selected}
              multiple
              onChange={(e) => {
                const selected = e.target.value as Number[];
                setSelected(selected);
              }}
              renderValue={() => {
                const selectedMC = selected.map((selectedId) => {
                  return menuCategory.find(
                    (item) => item.id == selectedId
                  ) as MenuCategory;
                });
                return selectedMC.map((param) => param.name).join(",");
              }}
            >
              {menuCategory.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    <Checkbox checked={selected.includes(item.id)} />

                    <ListItem>{item.name}</ListItem>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
export default NewAddonCategoryDialog;
