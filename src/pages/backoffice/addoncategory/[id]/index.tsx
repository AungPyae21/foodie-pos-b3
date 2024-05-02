import DeleteDialog from "@/components/DeleteDialog";
import LayoutBackOffice from "@/components/LayoutBackOffice";
import MultiSelect from "@/components/MultiSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slices/AddonCategorySlice";
import { setSelectedLocation } from "@/store/slices/AppSlice";
import { showSnackbar } from "@/store/slices/AppSnackBarSlice";
import { deleteLocation, updateLocation } from "@/store/slices/locationSlice";
import { updateAddonCategoryPayload } from "@/types/addonCategory";
import { UpdateLocationPayload } from "@/types/locationType";
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
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Menu } from "@prisma/client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LocationsDetails = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [updateData, setUpdateData] = useState<updateAddonCategoryPayload>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const addonCategoryId = Number(router.query.id);
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const addonCategory = addonCategories.find(
    (item) => item.id === addonCategoryId
  );
  const { menus } = useAppSelector((state) => state.menu);
  const { menuAddonCategories } = useAppSelector(
    (state) => state.menuAddonCategory
  );
  const selectedMenuIds = menuAddonCategories
    .filter((item) => item.addonCategoryId === addonCategoryId)
    .map((item) => {
      const current = menus.find((param) => param.id === item.menuId) as Menu;
      return current.id;
    });
  useEffect(() => {
    setSelected(selectedMenuIds);
    setUpdateData(addonCategory);
  }, [addonCategory]);
  useEffect(() => {
    if (updateData) {
      setUpdateData({ ...updateData, menuId: selected });
    }
  }, [selected]);
  if (!updateData)
    return (
      <LayoutBackOffice>
        <Typography>Addon Category does not found</Typography>
      </LayoutBackOffice>
    );
  const handleDelete = () => {
    dispatch(
      deleteAddonCategory({
        id: addonCategoryId,
        OnSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "AddonCategory Deleted Successfully",
            })
          );
        },
      })
    );
    router.push("/backoffice/addoncategory");
  };
  const handleUpdate = () => {
    dispatch(
      updateAddonCategory({
        ...updateData,
        OnSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "Addon Category updated successfully",
            })
          );
        },
      })
    );
    router.push("/backoffice/addoncategory");
  };
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
          label="Name"
          onChange={(e) =>
            setUpdateData({ ...updateData, name: e.target.value })
          }
        ></TextField>
        <MultiSelect
          title="Menu"
          selected={selected}
          setSelected={setSelected}
          items={menus}
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={updateData.isRequired}
              onChange={(evt, value) =>
                setUpdateData({ ...updateData, isRequired: value })
              }
            />
          }
          label="IsRequired"
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
        title="Are you sure want to delete this menuCategory?"
        handleDelete={handleDelete}
      />
    </LayoutBackOffice>
  );
};

export default LocationsDetails;
