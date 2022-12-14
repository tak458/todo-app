import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export const SideBar = ({ open, onClose }: SideBarProps) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItem>menu</ListItem>
      </List>
    </Drawer>
  );
};
