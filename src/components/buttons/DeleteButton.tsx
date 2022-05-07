import { IconButton, IconButtonProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { FC } from "react";

import Hoge from "hoge";
import Fuga from "fuga";

export const DeleteButton: FC<IconButtonProps> = (props: any) => {
  return (
    <IconButton {...props} size="large">
      <DeleteIcon />
    </IconButton>
  );
};
