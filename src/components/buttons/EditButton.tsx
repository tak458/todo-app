import { IconButton, IconButtonProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const EditButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} size="large">
      <EditIcon />
    </IconButton>
  );
};
