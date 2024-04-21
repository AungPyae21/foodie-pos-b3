import { useAppSelector } from "@/store/hooks";
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
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewAddonDialog = ({ open, setOpen }: Props) => {
  const { menuCategory } = useAppSelector((state) => state.menuCategory);
  const [selected, setSelected] = useState<Number[]>([]);
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Add on</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <TextField
            type="text"
            placeholder="Name"
            sx={{ width: "100%", mb: 2 }}
          />
          <TextField
            type="number"
            label="Price"
            sx={{ width: "100%", mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>MenuCategory</InputLabel>
            <Select
              input={<OutlinedInput label="menuCategory" />}
              multiple
              value={selected}
              onChange={(e) => {
                const selected = e.target.value as number[];
                setSelected(selected);
              }}
              renderValue={() => {
                const selectedMenuCategory = selected.map((selectedId) => {
                  return menuCategory.find(
                    (item) => item.id == selectedId
                  ) as MenuCategory;
                });
                return selectedMenuCategory.map((item) => item.name).join(",");
              }}
            >
              {menuCategory.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    <Checkbox checked={selected.includes(item.id)} />
                    <ListItem>{item.name}</ListItem>
                    {/* <ListItemText primary={item.name} /> */}
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
export default NewAddonDialog;
