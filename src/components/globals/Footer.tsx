import { AppBar, Toolbar, Typography } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FooterProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Footer = (props: FooterProps) => {
  return (
    <AppBar component={"footer"} position="relative">
      <Toolbar variant="dense">
        <Typography>footer</Typography>
      </Toolbar>
    </AppBar>
  );
};
