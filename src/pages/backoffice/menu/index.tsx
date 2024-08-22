import NewMenuDialog from "@/components/NewMenuDialog";
import { useAppSelector } from "@/store/hooks";
import { createMenuPayload } from "@/types/menuType";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import MenuCard from "@/components/MenuCard";
import { Menu } from "@prisma/client";

const MenuPage = () => {
  const oldMenus = useAppSelector((state) => state.menu.menus);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const [open, setOpen] = useState<boolean>(false);
  const { disabledLocationMenu } = useAppSelector(
    (state) => state.disabledLocationMenu
  );
  const [newMenu, setNewMenu] = useState<createMenuPayload>({
    name: "",
    price: 0,
    menuCategoryIds: [],
  });
  let menus: Menu[] = oldMenus;
  useEffect(() => {
    menus = oldMenus;
  }, [oldMenus]);
  if (!oldMenus)
    return (
      <Box>
        <div>wait for the menus</div>
      </Box>
    );
  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            New Menu
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menus.map((item) => {
          const isAvaliable = disabledLocationMenu.find(
            (param) =>
              param.locationId === selectedLocation?.id &&
              param.menuId === item.id
          )
            ? false
            : true;
          return (
            <Box key={item.id}>
              <MenuCard
                menu={item}
                href={`/backoffice/menu/${item.id}`}
                isAvailable={isAvaliable}
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
    </Box>
  );
};
export default MenuPage;
