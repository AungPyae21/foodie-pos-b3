import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut, useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";

const TopBar = () => {
  const { data } = useSession();
  const { selectedLocation } = useAppSelector((state) => state.app);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#265073" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            foodie-pos
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedLocation?.name}
          </Typography>
          {data && (
            <Button color="inherit" onClick={() => signOut()}>
              LogOut
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default TopBar;
