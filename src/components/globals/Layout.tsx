import React, { FC, useState } from "react";
import Head from "next/head";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import makeStyles from '@mui/styles/makeStyles';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

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
        <title>Tasks Local</title>
        <meta name="description" content="TODOアプリ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onOpen={() => setOpen(true)} />
      <SideBar onClose={() => setOpen(false)} open={open} />

      <main className={classes.content}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>{props.children}</ErrorBoundary>
      </main>

      <Footer />
    </>
  );
};
