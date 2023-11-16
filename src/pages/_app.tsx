import createEmotionCache from "@/models/createEmotionCache";
import { useStore } from "@/store";
import { ColorModeContext, useThemeMode } from "@/theme";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider, Theme, ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

import { GTM_ID, pageview } from "@/lib/gtm";
import "@/styles/globals.css";

declare module "@mui/material/styles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { theme, colorMode } = useThemeMode();
  const store = useStore();
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (!GTM_ID) return;

    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {/* Google Tag Manager - Global base code */}
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <SnackbarProvider maxSnack={3}>
                <Component {...pageProps} />
              </SnackbarProvider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </StyledEngineProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
