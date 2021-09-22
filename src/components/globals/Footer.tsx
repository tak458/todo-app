import makeStyles from '@mui/styles/makeStyles';
import { FC } from "react";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: "100%",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
  },
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FooterProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Footer: FC<FooterProps> = (props) => {
  const classes = useStyles();
  return <footer className={classes.footer}>footer&nbsp;</footer>;
};
