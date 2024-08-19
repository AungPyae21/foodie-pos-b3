import { store } from "@/store/store";
import { createTheme } from "@mui/material";

const getDesignTokens = () => {
  const state = store.getState();
  const theme = state.app.theme;
  if (theme === "light") {
    return {
      palette: {
        primary: {
          main: "#4C4C6D",
        },
        secondary: {
          main: "#1cc9a9",
        },
        info: {
          main: "#E8F6EF",
        },
        success: {
          main: "#1B9C85",
        },
      },
    };
  }
  return {
    palette: {
      primary: {
        main: "#1B9C85",
        dark: "#525957",
      },
      secondary: {
        main: "#a8dadc",
      },
      info: {
        main: "#f1faee",
      },
      success: {
        main: "#1d3557",
      },
    },
  };
};
export const theme = createTheme(getDesignTokens());
