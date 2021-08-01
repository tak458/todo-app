import { IconButton, IconButtonProps } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { FC } from "react";

export const DeleteButton: FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props}>
      <DeleteIcon />
    </IconButton>
  );
};
