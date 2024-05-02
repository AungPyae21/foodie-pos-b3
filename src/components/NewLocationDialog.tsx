import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showSnackbar } from "@/store/slices/AppSnackBarSlice";
import { createLocation } from "@/store/slices/locationSlice";
import { CreateLocationPayload } from "@/types/locationType";
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
  newLocation: CreateLocationPayload;
  setNewLocation: Dispatch<SetStateAction<CreateLocationPayload>>;
}

const NewLocationDialog = ({
  open,
  setOpen,
  newLocation,
  setNewLocation,
}: Props) => {
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.company);
  useEffect(() => {
    setNewLocation({ ...newLocation, companyId: company?.id });
  }, [company]);
  const handleCreateLocation = () => {
    const isValid =
      newLocation.name &&
      newLocation.street &&
      newLocation.township &&
      newLocation.city &&
      newLocation.companyId;
    if (!isValid) {
      return alert(
        `Missing requirments for companyId ${newLocation.companyId} and ${newLocation}`
      );
    }

    dispatch(
      createLocation({
        ...newLocation,
        OnSuccess: () => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "Location Creation operation success",
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
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Location</DialogTitle>
        <DialogContent sx={{ width: "350px" }}>
          <TextField
            sx={{ mb: 2, width: "100%" }}
            type="text"
            label="Name"
            onChange={(e) =>
              setNewLocation({ ...newLocation, name: e.target.value })
            }
          ></TextField>
          <TextField
            sx={{ mb: 2, width: "100%" }}
            label="Street"
            type="text"
            onChange={(e) =>
              setNewLocation({ ...newLocation, street: e.target.value })
            }
          ></TextField>
          <TextField
            sx={{ mb: 2, width: "100%" }}
            label="City"
            type="text"
            onChange={(e) =>
              setNewLocation({ ...newLocation, city: e.target.value })
            }
          ></TextField>
          <TextField
            sx={{ mb: 2, width: "100%" }}
            label="Township"
            type="text"
            onChange={(e) =>
              setNewLocation({ ...newLocation, township: e.target.value })
            }
          ></TextField>
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
            onClick={handleCreateLocation}
          >
            create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default NewLocationDialog;
