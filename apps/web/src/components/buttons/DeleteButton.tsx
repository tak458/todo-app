import DeleteIcon from "@mui/icons-material/Delete";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export const DeleteButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} size="large">
      <DeleteIcon />
    </IconButton>
  );
};
