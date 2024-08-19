import { useAppSelector } from "@/store/hooks";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: Props) {
  const apptheme = useAppSelector((state) => state.app.theme);
  const getDesignTokens = () => {
    if (apptheme === "light") {
      return {
        palette: {
          primary: {
            main: "#A28B55",
          },
          secondary: {
            main: "#86AB89",
          },
          info: {
            main: "#CBE2B5",
          },
          success: {
            main: "#E7FBE6",
          },
        },
      };
    }
    return {
      palette: {
        primary: {
          main: "#5a588c",
        },
        secondary: {
          main: "#134B70",
        },
        info: {
          main: "#508C9B",
        },
        success: {
          main: "#EEEEEE",
        },
      },
    };
  };
  const theme = createTheme(getDesignTokens());
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
