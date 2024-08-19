import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AppDataSelector, setTheme } from "@/store/slices/AppSlice";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { shallowEqual } from "react-redux";

const Setting = () => {
  const dispatch = useAppDispatch();
  const { app } = useAppSelector(AppDataSelector, shallowEqual);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h2">Setting</Typography>
        <Button variant="contained">Click</Button>
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={app.theme === "dark"}
            onChange={(evt, value) => {
              const theme = value ? "dark" : "light";
              dispatch(setTheme(theme));
              localStorage.setItem("theme", theme);
            }}
          />
        }
        label="Use Dark Mode"
      />
    </Box>
  );
};
export default Setting;
