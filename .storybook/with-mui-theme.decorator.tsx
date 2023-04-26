import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { theme } from "../src/theme";
// ダークテーマ追加した時用 https://github.com/Integrayshaun/storybook-mui-example/tree/main
// import { themes } from "../src/themes";

export const withMuiTheme = (Story, context) => {
  const { theme: themeKey } = context.globals;

  // ダークテーマ追加した時用 https://github.com/Integrayshaun/storybook-mui-example/tree/main
  // // only recompute the theme if the themeKey changes
  // const theme = useMemo(() => themes[themeKey] || themes['light'], [themeKey])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};
