import DeleteDialog from "@/components/DeleteDialog";
import LayoutBackOffice from "@/components/LayoutBackOffice";
import MultiSelect from "@/components/MultiSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/AppSnackBarSlice";
import { deleteMenu, updateMenu } from "@/store/slices/MenuSlice";
import { updateMenuPayload } from "@/types/menuType";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<updateMenuPayload>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menuId = Number(router.query.id);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disabledLocationMenu } = useAppSelector(
    (state) => state.disabledLocationMenu
  );
  const { menuCategory } = useAppSelector((state) => state.menuCategory);
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
  const isAvaliable = disabledLocationMenu.find(
    (item) => item.locationId === selectedLocation?.id && item.menuId === menuId
  )
    ? false
    : true;

  const handleUpdate = () => {
    if (!updateData?.menuCategoryIds?.length) {
      return dispatch(
        showSnackbar({
          type: "error",
          message: "Please select at least one menuCategory",
        })
      );
    }
    updateData &&
      dispatch(
        updateMenu({
          ...updateData,
          OnSuccess: () =>
            dispatch(
              showSnackbar({
                type: "success",
                message: "Update Menu Category successfully",
              })
            ),
        })
      );
    router.push("/backoffice/menu");
  };

  useEffect(() => {
    if (currentMenu) {
      setSelected(selectedMenuCategoryId);
      setUpdateData({
        ...currentMenu,
        isAvaliable: isAvaliable,
        locationId: selectedLocation?.id,
        menuCategoryIds: selected,
      });
    }
  }, [currentMenu]);
  useEffect(() => {
    if (updateData) {
      setUpdateData({ ...updateData, menuCategoryIds: selected });
    }
  }, [selected]);

  if (!updateData)
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
          defaultValue={updateData.name}
          label="Menu"
          onChange={(eve) =>
            setUpdateData({ ...updateData, name: eve.target.value })
          }
        ></TextField>
        <TextField
          sx={{ mb: 2 }}
          label="Price"
          type="number"
          defaultValue={updateData.price}
          onChange={(eve) =>
            setUpdateData({ ...updateData, price: Number(eve.target.value) })
          }
        ></TextField>
        <MultiSelect
          title="MenuCategory"
          selected={selected}
          setSelected={setSelected}
          items={menuCategory}
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={isAvaliable}
              onChange={(evt, value) =>
                setUpdateData({ ...updateData, isAvaliable: value })
              }
            />
          }
          label="isAvaliable"
        />
        <Button
          onClick={handleUpdate}
          sx={{ width: "fit-content", mt: 2 }}
          variant="contained"
        >
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
