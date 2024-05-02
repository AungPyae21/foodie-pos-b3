import DeleteDialog from "@/components/DeleteDialog";
import LayoutBackOffice from "@/components/LayoutBackOffice";
import SingleSelect from "@/components/SingleSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddon, updateAddon } from "@/store/slices/AddonSlice";
import { showSnackbar } from "@/store/slices/AppSnackBarSlice";
import { updateAddonParam } from "@/types/addon";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

const addonDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const addonId = Number(router.query.id);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>();
  const { addons } = useAppSelector((state) => state.addon);
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const addon = addons.find((addon) => addon.id === addonId);
  const [updateData, setUpdateData] = useState<updateAddonParam>();
  const handleUpdate = () => {
    if (updateData) {
      dispatch(
        updateAddon({
          ...updateData,
          OnSuccess: () => {
            dispatch(
              showSnackbar({
                type: "success",
                message: `Updated this ${addon?.name} addon successfully `,
              })
            );
          },
        })
      );
      router.push("/backoffice/addon");
    }
  };
  useEffect(() => {
    if (addon) {
      setUpdateData(addon);
      setSelected(addon.addonCategoryId);
    }
  }, [addon]);

  useEffect(() => {
    if (updateData && selected) {
      setUpdateData({ ...updateData, addonCategoryId: selected });
    }
  }, [selected]);
  if (!updateData) {
    return (
      <LayoutBackOffice>
        <Typography>Addon not found</Typography>
      </LayoutBackOffice>
    );
  }
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
      <Box sx={{ display: "flex", flexDirection: "column", width: 450 }}>
        <TextField
          sx={{ mb: 2 }}
          defaultValue={addon?.name}
          type="text"
          label="name"
          onChange={(eve) =>
            setUpdateData({ ...updateData, name: eve.target.value })
          }
        ></TextField>
        <TextField
          sx={{ mb: 2 }}
          defaultValue={addon?.price}
          type="number"
          label="price"
          onChange={(eve) =>
            setUpdateData({ ...updateData, price: Number(eve.target.value) })
          }
        ></TextField>
        <SingleSelect
          items={addonCategories}
          title="Addon Category"
          selected={selected}
          setSelected={setSelected}
        />
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{ width: "fit-content" }}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title={"Are you sure want to delete this addon?"}
        handleDelete={() => {
          dispatch(
            deleteAddon({
              id: addonId,
              OnSuccess: () => {
                dispatch(
                  showSnackbar({
                    type: "success",
                    message: "Addon delete successfully",
                  })
                );
              },
            })
          );
          setOpen(false);
          router.push("/backoffice/addon");
        }}
      />
    </LayoutBackOffice>
  );
};

export default addonDetails;
