import { Drawer, List, ListItem } from "@mui/material";
import { FC } from "react";

export interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export const SideBar: FC<SideBarProps> = (props) => {
  return (
    <Drawer anchor="left" open={props.open} onClose={props.onClose}>
      <List>
        <ListItem>menu</ListItem>
      </List>
    </Drawer>
  );
};
