import { styled } from "@mui/material/styles";
import { FC } from "react";

const StyledFooter = styled("footer")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: "100%",
  display: "flex",
  // justifyContent: "center",
  alignItems: "center",
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FooterProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Footer: FC<FooterProps> = (props) => {
  return <StyledFooter>footer&nbsp;</StyledFooter>;
};
