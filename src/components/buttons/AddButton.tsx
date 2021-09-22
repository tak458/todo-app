import { IconButton, IconButtonProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { FC } from "react";

export const AddButton: FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props} size="large">
      <AddIcon />
    </IconButton>
  );
};
