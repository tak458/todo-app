import { IconButton, IconButtonProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const AddButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} size="large">
      <AddIcon />
    </IconButton>
  );
};
