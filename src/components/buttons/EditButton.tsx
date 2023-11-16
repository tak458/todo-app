import EditIcon from "@mui/icons-material/Edit";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export const EditButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} size="large">
      <EditIcon />
    </IconButton>
  );
};
