import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useCallback } from "react";

const PREFIX = "Header";

const classes = {
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
  },
}));

export interface HeaderProps {
  onOpen: () => void;
}

export const Header = (props: HeaderProps) => {
  const onOpen = useCallback(() => {
    props.onOpen();
  }, [props]);

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onOpen}
          className={classes.menuButton}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Tasks Local
        </Typography>
        <IconButton edge="start" color="inherit" href="https://github.com/tak458/todo-app">
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};
