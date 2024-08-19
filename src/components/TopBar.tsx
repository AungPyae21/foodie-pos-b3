import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { signOut, useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";

const TopBar = () => {
  const { data } = useSession();
  const { theme } = useAppSelector((state) => state.app);
  const { selectedLocation } = useAppSelector((state) => state.app);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: theme === "light" ? "primary.main" : "secondary.main ",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            foodie-pos
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedLocation?.name}
          </Typography>
          {data && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => signOut()}
            >
              LogOut
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default TopBar;
