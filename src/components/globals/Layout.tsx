import React, { FC, useState } from "react";
import Head from "next/head";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  content: {
    flex: "1 0 auto",
  },
}));

export const Layout: FC = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>TODO APP</title>
        <meta name="description" content="TODOアプリ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onOpen={() => setOpen(true)} />
      <SideBar onClose={() => setOpen(false)} open={open} />

      <main className={classes.content}>{props.children}</main>

      <Footer />
    </>
  );
};
