import AddIcon from "@mui/icons-material/Add";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export const AddButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} size="large">
      <AddIcon />
    </IconButton>
  );
};
