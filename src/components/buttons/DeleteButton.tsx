import { IconButton, IconButtonProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} size="large">
      <DeleteIcon />
    </IconButton>
  );
};
