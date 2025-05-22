import { ErrorFallback } from "@/components/globals/ErrorFallback";
import { Footer } from "@/components/globals/Footer";
import { Header } from "@/components/globals/Header";
import { SideBar } from "@/components/globals/SideBar";
import { styled } from "@mui/material/styles";
import Head from "next/head";
import { ReactNode, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
