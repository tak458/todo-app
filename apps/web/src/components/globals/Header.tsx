import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useColorScheme } from "@mui/material/styles";
import { useCallback } from "react";

export interface HeaderProps {
  onOpen: () => void;
}

export const Header = (props: HeaderProps) => {
  const { mode, setMode } = useColorScheme();

  const onOpen = useCallback(() => {
    props.onOpen();
  }, [props]);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onOpen}
          sx={{ marginRight: 2 }}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {process.env.NEXT_PUBLIC_SITE_TITLE}
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton color="inherit" onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
