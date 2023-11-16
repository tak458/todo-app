import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    cancel: true;
  }
}

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

let theme = createTheme({
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
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

theme = createTheme(theme, {
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
    MuiButton: {
      variants: [
        {
          props: { variant: "cancel" },
          style: {
            color: "#fff",
            backgroundColor: "#CCC",
          },
        },
      ],
    },
  },
});

export { theme };
