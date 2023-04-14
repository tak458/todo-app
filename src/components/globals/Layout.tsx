import { useState, ReactNode } from "react";
import Head from "next/head";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { styled } from "@mui/material/styles";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

const StyledMain = styled("main")({
  flex: "1 0 auto",
});

export const Layout = (props: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
      </Head>

      <Header onOpen={() => setOpen(true)} />
      <SideBar onClose={() => setOpen(false)} open={open} />

      <StyledMain>
        <ErrorBoundary FallbackComponent={ErrorFallback}>{props.children}</ErrorBoundary>
      </StyledMain>

      <Footer />
    </>
  );
};
