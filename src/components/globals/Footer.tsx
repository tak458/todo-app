import { AppBar, IconButton, Link, Stack, Toolbar, Typography } from "@mui/material";
import { SiStorybook } from "react-icons/si";
import GitHubIcon from "@mui/icons-material/GitHub";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FooterProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Footer = (props: FooterProps) => {
  return (
    <AppBar component={"footer"} position="relative">
      <Toolbar variant="dense">
        <Typography variant="caption" sx={{ flexGrow: 1 }}>
          Copyright ©{" "}
          <Link href="https://github.com/tak458" color="inherit">
            tak458
          </Link>{" "}
          All Rights Reserved.
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="storybook link"
            size="small"
            href="https://tak458.github.io/todo-app/storybook"
            target="_blank"
          >
            <SiStorybook />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="github link"
            size="small"
            href="https://github.com/tak458/todo-app"
            target="_blank"
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
