import ItemCard from "@/components/ItemCard";
import LayoutBackOffice from "@/components/LayoutBackOffice";
import NewAddonCategoryDialog from "@/components/NewAddonCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ClassIcon from "@mui/icons-material/Class";
import { createAddonCategoryParam } from "@/types/addonCategory";

const AddonCategory = () => {
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const [newAddonCategory, setNewAddonCategory] =
    useState<createAddonCategoryParam>({
      name: "",
      isRequired: true,
      menuId: [],
    });
  const [open, setOpen] = useState<boolean>(false);
  return (
    <LayoutBackOffice>
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
          New Add-on Category
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {addonCategories.map((item) => {
            return (
              <Box key={item.id}>
                <ItemCard
                  title={item.name}
                  icon={<ClassIcon />}
                  href={`/backoffice/addoncategory/${item.id}`}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <NewAddonCategoryDialog
        setNewAddonCategory={setNewAddonCategory}
        newAddonCategory={newAddonCategory}
        open={open}
        setOpen={setOpen}
      />
    </LayoutBackOffice>
  );
};
export default AddonCategory;
