import { PaletteMode, createTheme, useMediaQuery } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useThemeMode() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode == "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return { theme, colorMode };
}
