import ItemCard from "@/components/ItemCard";
import LayoutBackOffice from "@/components/LayoutBackOffice";
import NewAddonDialog from "@/components/NewAddonDialog";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import EggIcon from "@mui/icons-material/Egg";
import { createAddonParam } from "@/types/addon";

const Addon = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { addons } = useAppSelector((state) => state.addon);
  const [newAddon, setNewAddon] = useState<createAddonParam>({
    name: "",
    price: 0,
    addonCategoryId: undefined,
  });
  return (
    <LayoutBackOffice>
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
            New Add-on
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {addons.map((addon) => {
          return (
            <ItemCard
              key={addon.id}
              title={addon.name}
              icon={<EggIcon />}
              href={`/backoffice/addon/${addon.id}`}
            />
          );
        })}
      </Box>

      <NewAddonDialog
        open={open}
        setOpen={setOpen}
        newAddon={newAddon}
        setNewAddon={setNewAddon}
      />
    </LayoutBackOffice>
  );
};
export default Addon;
