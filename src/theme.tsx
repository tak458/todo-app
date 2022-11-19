import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#424242",
    },
    secondary: {
      main: "#2962ff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            borderBottom: "dotted 1px #ccc",
          },
        },
        content: {
          "&.Mui-expanded": {
            margin: "unset",
          },
        },
      },
    },
  },
});
