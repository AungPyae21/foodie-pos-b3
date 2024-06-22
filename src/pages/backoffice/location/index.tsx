import ItemCard from "@/components/ItemCard";

import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import NewLocationDialog from "@/components/NewLocationDialog";
import { CreateLocationPayload } from "@/types/locationType";

const Location = () => {
  const { company } = useAppSelector((state) => state.company);
  const [open, setOpen] = useState(false);
  const [newLocation, setNewLocation] = useState<CreateLocationPayload>({
    name: "",
    street: "",
    township: "",
    city: "",
    companyId: company?.id,
  });
  const { locations } = useAppSelector((state) => state.location);

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#265073", "&:hover": { bgcolor: "#236193" } }}
            onClick={() => setOpen(true)}
          >
            New Location
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {locations.map((item) => {
            return (
              <Box key={item.id}>
                <ItemCard
                  title={item.name}
                  icon={<LocationOnIcon />}
                  href={`/backoffice/location/${item.id}`}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <NewLocationDialog
        open={open}
        setOpen={setOpen}
        newLocation={newLocation}
        setNewLocation={setNewLocation}
      />
    </Box>
  );
};
export default Location;
