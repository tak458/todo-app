import { IconButton, IconButtonProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { FC } from "react";

export interface TestProps extends Pick<IconButtonProps, "colors"> {}

export const EditButton: FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props} size="large">
      <EditIcon />
    </IconButton>
  );
};
