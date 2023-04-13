import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";

export interface HeaderProps {
  onOpen: () => void;
}

export const Header = (props: HeaderProps) => {
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
        <IconButton
          edge="start"
          color="inherit"
          aria-label="github link"
          size="large"
          href="https://github.com/tak458/todo-app"
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
