import DeleteDialog from "@/components/DeleteDialog";
import LayoutBackOffice from "@/components/LayoutBackOffice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteMenu } from "@/store/slices/MenuSlice";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menuId = Number(router.query.id);
  const { menuCategory } = useAppSelector((state) => state.menuCategory);
  const [selected, setSelected] = useState<Number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { MenuCategoryMenu } = useAppSelector(
    (state) => state.menuCategoryMenu
  );
  const { menus } = useAppSelector((state) => state.menu);
  const currentMenu = menus.find((item) => item.id === menuId);
  const selectedMenuCategoryId = MenuCategoryMenu.filter(
    (item) => item.menuId === menuId
  ).map((item) => {
    const current = menuCategory.find(
      (param) => param.id === item.menuCategoryId
    ) as MenuCategory;
    return current.id;
  });
  useEffect(() => {
    setSelected(selectedMenuCategoryId);
  }, []);
  if (!currentMenu)
    return (
      <LayoutBackOffice>
        <Typography>Menu does not found</Typography>
      </LayoutBackOffice>
    );
  return (
    <LayoutBackOffice>
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
        <TextField
          sx={{ mb: 2 }}
          type="text"
          defaultValue={currentMenu.name}
          label="Menu"
        ></TextField>
        <TextField
          sx={{ mb: 2 }}
          label="Price"
          type="number"
          defaultValue={currentMenu.price}
        ></TextField>
        <FormControl fullWidth>
          <InputLabel>MenuCategory</InputLabel>
          <Select
            input={<OutlinedInput label="MenuCategory" />}
            value={selected}
            multiple
            onChange={(e) => {
              const selected = e.target.value as Number[];
              setSelected(selected);
            }}
            renderValue={() => {
              return selected
                .map(
                  (item) =>
                    menuCategory.find(
                      (param) => param.id === item
                    ) as MenuCategory
                )
                .map((item) => item.name)
                .join(",");
            }}
          >
            {menuCategory.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  <Checkbox checked={selected.includes(item.id)} />
                  <ListItemText>{item.name}</ListItemText>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button sx={{ width: "fit-content", mt: 2 }} variant="contained">
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Are you sure to delete this menu?"
        handleDelete={() => {
          dispatch(deleteMenu({ id: menuId }));
          setOpen(false);
          router.push("/backoffice/menu");
        }}
      />
    </LayoutBackOffice>
  );
};

export default MenuDetails;
