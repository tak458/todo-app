import { makeStyles } from "@material-ui/core";
import Image from "next/image";
import { FC } from "react";

const useStyles = makeStyles({
  footer: {
    width: "100%",
    height: 100,
    borderTop: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footerLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  logo: {
    height: "1em",
    marginLeft: "0.5rem",
  },
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FooterProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Footer: FC<FooterProps> = (props) => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span className={classes.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  );
};
