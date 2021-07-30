import { IconButton, IconButtonProps } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { FC } from "react";

export const AddButton: FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props}>
      <AddIcon />
    </IconButton>
  );
};
