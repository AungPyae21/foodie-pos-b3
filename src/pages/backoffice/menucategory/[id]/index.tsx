import DeleteDialog from "@/components/DeleteDialog";
import LayoutBackOffice from "@/components/LayoutBackOffice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/AppSnackBarSlice";
import {
  UpdateMenuCategory,
  deleteMenuCategory,
} from "@/store/slices/MenuCategorySlice";
import { UpdateMenuCategoryPayload } from "@/types/menuCategoryType";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetails = () => {
  const router = useRouter();
  const menuCategoryId = Number(router.query.id);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<UpdateMenuCategoryPayload>();
  const { menuCategory } = useAppSelector((state) => state.menuCategory);
  const currentMenuCategory = menuCategory.find(
    (item) => item.id === menuCategoryId
  );

  if (currentMenuCategory) {
    useEffect(() => {
      setUpdateData(currentMenuCategory);
    }, [currentMenuCategory]);
  }

  const handleclick = () => {
    const shouldUpdate =
      currentMenuCategory?.name !== updateData?.name ||
      currentMenuCategory?.isAvailable !== updateData?.isAvailable;
    if (!shouldUpdate) {
      router.push("backoffice/menucategory");
    }
    updateData &&
      dispatch(
        UpdateMenuCategory({
          ...updateData,
          OnSuccess: () => {
            dispatch(
              showSnackbar({
                type: "success",
                message: "Update MenuCategory Successfully",
              })
            );
            router.push("/backoffice/menucategory");
          },
        })
      );
  };

  if (!updateData)
    return (
      <LayoutBackOffice>
        <Typography>MenuCategory is not found</Typography>
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
      <Box sx={{ display: "flex", flexDirection: "column", width: 400 }}>
        <TextField
          onChange={(e) => {
            setUpdateData({ ...updateData, name: e.target.value });
          }}
          defaultValue={updateData.name}
        ></TextField>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={updateData.isAvailable}
              onChange={(evt, value) =>
                setUpdateData({ ...updateData, isAvailable: value })
              }
            />
          }
          label="Available"
        />
        <Button
          //disabled //={
          //   updateData.name === currentMenuCategory?.name &&
          //   updateData.isAvailable === currentMenuCategory.isAvailable
          // }
          onClick={handleclick}
          sx={{ width: "fit-content" }}
          variant="contained"
        >
          Update
        </Button>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          title={"Are you sure want to delete this menuCategory?"}
          handleDelete={() => {
            dispatch(deleteMenuCategory({ id: menuCategoryId }));
            setOpen(false);
            router.push("/backoffice/menucategory");
          }}
        />
      </Box>
    </LayoutBackOffice>
  );
};

export default MenuCategoryDetails;
