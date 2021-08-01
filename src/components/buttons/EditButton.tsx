import { IconButton, IconButtonProps } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React, { FC } from "react";

export const EditButton: FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props}>
      <EditIcon />
    </IconButton>
  );
};
