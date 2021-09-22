import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
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
});
