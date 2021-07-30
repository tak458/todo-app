import { createTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

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
