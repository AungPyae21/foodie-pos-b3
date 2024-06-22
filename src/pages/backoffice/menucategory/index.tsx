import ItemCard from "@/components/ItemCard";
import NewMenuCategoryDialog from "@/components/NewMenuCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import { createMenuCategoryParam } from "@/types/menuCategoryType";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const MenuCategory = () => {
  const companyId = useAppSelector((state) => state.company.company?.id);
  const { disabledLocationMenuCategory } = useAppSelector(
    (state) => state.disabledLocationMenuCategory
  );
  const { selectedLocation } = useAppSelector((state) => state.app);

  const menuCategory = useAppSelector(
    (state) => state.menuCategory.menuCategory
  );
  const [open, setOpen] = useState<boolean>(false);
  const [newMenuCategory, setNewMenuCategory] =
    useState<createMenuCategoryParam>({
      name: "",
      isAvailable: true,
      companyId: companyId,
    });

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
            New Menu Category
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menuCategory.map((param) => {
          const isDisabled = disabledLocationMenuCategory.find(
            (item) =>
              item.menuCategoryId === param.id &&
              item.locationId === selectedLocation?.id
          )
            ? true
            : false;
          return (
            <Box key={param.id}>
              <ItemCard
                icon={<MenuBookIcon />}
                title={param.name}
                href={`/backoffice/menucategory/${param.id}`}
                isDisabled={isDisabled}
              />
            </Box>
          );
        })}
      </Box>
      <NewMenuCategoryDialog
        open={open}
        setOpen={setOpen}
        newMenuCategory={newMenuCategory}
        setNewMenuCategory={setNewMenuCategory}
      />
    </Box>
  );
};
export default MenuCategory;
