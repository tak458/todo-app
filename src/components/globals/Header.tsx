import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import React, { FC, useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export interface HeaderProps {
  onOpen: () => void;
}

export const Header: FC<HeaderProps> = (props) => {
  const classes = useStyles();

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
          className={classes.menuButton}
          size="large">
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Tasks Local
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
