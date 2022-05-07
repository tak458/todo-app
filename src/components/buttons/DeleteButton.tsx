import { IconButton, IconButtonProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { FC } from "react";

export const DeleteButton: FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props} size="large">
      <DeleteIcon />
    </IconButton>
  );
};
