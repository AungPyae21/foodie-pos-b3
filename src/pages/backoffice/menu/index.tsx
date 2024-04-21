import ItemCard from "@/components/ItemCard";
import LayoutBackOffice from "@/components/LayoutBackOffice";
import NewMenuDialog from "@/components/NewMenuDialog";
import { useAppSelector } from "@/store/hooks";
import { createMenuPayload } from "@/types/menuType";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const menu = () => {
  const { menus } = useAppSelector((state) => state.menu);
  console.log(menus);
  const [open, setOpen] = useState<boolean>(false);
  const [newMenu, setNewMenu] = useState<createMenuPayload>({
    name: "",
    price: 0,
    menuCategoryIds: [],
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
            New Menu
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menus.map((item) => {
          return (
            <Box key={item.id}>
              <ItemCard
                title={item.name}
                icon={<RestaurantMenuIcon />}
                href={`/backoffice/menu/${item.id}`}
              />
            </Box>
          );
        })}
      </Box>
      <NewMenuDialog
        newMenu={newMenu}
        setNewMenu={setNewMenu}
        open={open}
        setOpen={setOpen}
      />
    </LayoutBackOffice>
  );
};
export default menu;
