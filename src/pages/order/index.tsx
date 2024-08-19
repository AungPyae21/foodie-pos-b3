import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderApp = () => {
  const { isReady, ...router } = useRouter();
  const query = router.query;
  const tableId = query.tableId as string;
  const menuCategories = useAppSelector(
    (state) => state.menuCategory.menuCategory
  );
  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.MenuCategoryMenu
  );
  const menus = useAppSelector((state) => state.menu.menus);
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);

  useEffect(() => {
    if (isReady && !tableId) {
      router.push("/");
    }
  }, [isReady]);

  const renderMenus = () => {
    const validMenuIds = menuCategoryMenus
      .filter((item) => item.menuCategoryId === selectedMenuCategory?.id)
      .map((item) => item.menuId);
    const validMenus = menus.filter((item) => validMenuIds.includes(item.id));
    return validMenus.map((item) => {
      const href = { pathname: `/order/menu/${item.id}`, query };
      return <MenuCard key={item.id} menu={item} href={href} />;
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 800,
        m: "0 auto",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 10,
          bgcolor: "",
          mt: 10,
        }}
      >
        <Tabs
          TabIndicatorProps={{
            style: { background: "#A2D9FF" },
          }}
          value={value}
          onChange={(evt, value) => setValue(value)}
          variant="scrollable"
          scrollButtons={false}
          sx={{
            pb: 1,
            ".Mui-selected": {
              color: "#1B9C85",
              fontWeight: "bold",
            },
          }}
        >
          {menuCategories.map((item) => {
            return (
              <Tab
                key={item.id}
                label={item.name}
                sx={{ color: "#4C4C6D" }}
                onClick={() => setSelectedMenuCategory(item)}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          px: 2,
        }}
      >
        {renderMenus()}
      </Box>
    </Box>
  );
};

export default OrderApp;
