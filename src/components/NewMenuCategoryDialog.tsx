import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/AppSnackBarSlice";
import { createMenuCategory } from "@/store/slices/MenuCategorySlice";
import { createMenuCategoryParam } from "@/types/menuCategoryType";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenuCategory: createMenuCategoryParam;
  setNewMenuCategory: Dispatch<SetStateAction<createMenuCategoryParam>>;
}

const NewMenuCategoryDialog = ({
  open,
  setOpen,
  newMenuCategory,
  setNewMenuCategory,
}: Props) => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.company.company?.id);
  const handleclick = () => {
    const isValid = newMenuCategory.name;
    if (!isValid) return;
    dispatch(
      createMenuCategory({
        ...newMenuCategory,
        OnSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "MenuCategory Creation operation success",
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
    setNewMenuCategory({ ...newMenuCategory, companyId });
  }, [newMenuCategory]);
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Menu Category</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            type="name"
            placeholder="Name"
            onChange={(e) =>
              setNewMenuCategory({ ...newMenuCategory, name: e.target.value })
            }
          ></TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={newMenuCategory.isAvailable}
                onChange={(e, value) => {
                  setNewMenuCategory({
                    ...newMenuCategory,
                    isAvailable: value,
                  });
                }}
              />
            }
            label="Available"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            sx={{ color: "#265073" }}
            onClick={() => {
              setOpen(false);
            }}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#265073", "&:hover": { bgcolor: "#236193" } }}
            onClick={handleclick}
          >
            create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default NewMenuCategoryDialog;
