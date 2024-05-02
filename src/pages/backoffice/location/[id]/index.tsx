import DeleteDialog from "@/components/DeleteDialog";
import LayoutBackOffice from "@/components/LayoutBackOffice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedLocation } from "@/store/slices/AppSlice";
import { deleteLocation, updateLocation } from "@/store/slices/locationSlice";
import { UpdateLocationPayload } from "@/types/locationType";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LocationsDetails = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateData, setupdateData] = useState<UpdateLocationPayload>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locationId = Number(router.query.id);
  const { locations } = useAppSelector((state) => state.location);
  const location = locations.find((item) => item.id === locationId);
  const { selectedLocation, isLoading } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (location) {
      setupdateData(location);
    }
  }, [location]);

  if (isLoading) return null;

  if (!updateData)
    return (
      <LayoutBackOffice>
        <Typography>Location does not found</Typography>
      </LayoutBackOffice>
    );

  const handleUpdate = () => {
    dispatch(updateLocation(updateData));
    setOpen(false);
    router.push("/backoffice/location");
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
            setupdateData({ ...updateData, name: e.target.value })
          }
        ></TextField>
        <FormControlLabel
          control={
            <Switch
              checked={selectedLocation?.id === locationId}
              onChange={() => {
                if (location) {
                  dispatch(setSelectedLocation(location));
                  localStorage.setItem(
                    "selectedLocationId",
                    String(locationId)
                  );
                }
              }}
            />
          }
          label="current location"
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
        title="Are you sure want to delete this location?"
        handleDelete={() => {
          dispatch(deleteLocation({ id: locationId }));
          setOpen(false);
          router.push("/backoffice/location");
        }}
      />
    </LayoutBackOffice>
  );
};

export default LocationsDetails;
