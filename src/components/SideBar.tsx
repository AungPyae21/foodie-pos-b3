import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EggIcon from "@mui/icons-material/Egg";
import ClassIcon from "@mui/icons-material/Class";
import TableBarIcon from "@mui/icons-material/TableBar";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";

const sideBarItems = [
  { id: 1, name: "Order", to: "/backoffice/order", icon: <MailIcon /> },
  { id: 2, name: "Menu", to: "/backoffice/menu", icon: <RestaurantMenuIcon /> },
  {
    id: 3,
    name: "MenuCategory",
    to: "/backoffice/menucategory",
    icon: <MenuBookIcon />,
  },
  { id: 4, name: "Addon", to: "/backoffice/addon", icon: <EggIcon /> },
  {
    id: 5,
    name: "AddonCategory",
    to: "/backoffice/addoncategory",
    icon: <ClassIcon />,
  },
  { id: 6, name: "Tables", to: "/backoffice/table", icon: <TableBarIcon /> },
  {
    id: 7,
    name: "Location",
    to: "/backoffice/location",
    icon: <LocationOnIcon />,
  },
];
const SideBar = () => {
  return (
    <Box sx={{ height: "120vh", width: 280, bgcolor: "#2D9596", m: 0 }}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {sideBarItems.map((item) => (
            <Link
              key={item.id}
              href={item.to}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#F1FADA" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#F1FADA" }} primary={item.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <Link
            href="/backoffice/setting"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "#F1FADA" }}>
                  {<SettingsIcon />}
                </ListItemIcon>
                <ListItemText sx={{ color: "#F1FADA" }} primary="Setting" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
