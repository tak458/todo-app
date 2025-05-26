import GitHubIcon from "@mui/icons-material/GitHub";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { SiStorybook } from "react-icons/si";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FooterProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Footer = (props: FooterProps) => {
  return (
    <AppBar component={"footer"} position="relative">
      <Toolbar variant="dense">
        <Typography variant="caption" sx={{ flexGrow: 1 }}>
          Copyright ©{" "}
          <Link component={NextLink} href="https://github.com/tak458" color="inherit">
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
