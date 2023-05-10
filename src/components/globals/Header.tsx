import { useCallback, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import { SiStorybook } from "react-icons/si";
import { ColorModeContext } from "../../theme/hooks";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material";

export interface HeaderProps {
  onOpen: () => void;
}

export const Header = (props: HeaderProps) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

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
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="storybook link"
            size="large"
            href="https://tak458.github.io/todo-app/storybook"
          >
            <SiStorybook style={{ width: 24, height: 24 }} />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="github link"
            size="large"
            href="https://github.com/tak458/todo-app"
          >
            <GitHubIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
