import { Box, Chip, Typography } from "@mui/material";
import { Addon, AddonCategory } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import Addons from "./Addons";

interface Props {
  addonCategories: AddonCategory[];
  selectedAddons: Addon[];
  setSelectedAddons: Dispatch<SetStateAction<Addon[]>>;
}
const AddonCategories = ({
  addonCategories,
  selectedAddons,
  setSelectedAddons,
}: Props) => {
  return (
    <Box>
      {addonCategories.map((addoncategory) => {
        return (
          <Box key={addoncategory.id}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">{addoncategory.name}</Typography>
              <Chip
                label={addoncategory.isRequired ? "Required" : "Optional"}
              />
            </Box>
            <Addons
              selectedAddons={selectedAddons}
              setSelectedAddons={setSelectedAddons}
              addonCategoryId={addoncategory.id}
            />
          </Box>
        );
      })}
    </Box>
  );
};
export default AddonCategories;
//readd prisma
