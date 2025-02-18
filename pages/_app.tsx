import "simplebar/src/simplebar.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { NoSsr } from "@mui/material";
import { SettingsProvider } from "src/contexts/SettingsContext";
import { CollapseDrawerProvider } from "src/contexts/CollapseDrawerContext";
import ThemeConfig from "src/theme";
import GlobalStyles from "src/theme/globalStyles";
import createEmotionCache from "src/utils/createEmotionCache";
import Settings from "src/components/settings";
import RtlLayout from "src/components/RtlLayout";
import ProgressBar from "src/components/ProgressBar";
import LoadingScreen from "src/components/LoadingScreen";
import ThemePrimaryColor from "src/components/ThemePrimaryColor";
import { SupplierProvider } from "src/contexts/SupplierContext";
import { GlobalSettingsProvider } from "src/contexts/GlobalSettingsContext";
import { ProcurementProvider } from "src/contexts/ProcurementContext";

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SettingsProvider>
      <CollapseDrawerProvider>
        <GlobalSettingsProvider>
          <SupplierProvider>
            <ProcurementProvider>
              <CacheProvider value={emotionCache}>
                <Head>
                  <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                  />
                </Head>

                <ThemeConfig>
                  <ThemePrimaryColor>
                    <RtlLayout>
                      <NoSsr>
                        <Settings />
                      </NoSsr>
                      <GlobalStyles />
                      <ProgressBar />
                      <LoadingScreen />
                      <Component {...pageProps} />
                    </RtlLayout>
                  </ThemePrimaryColor>
                </ThemeConfig>
              </CacheProvider>
            </ProcurementProvider>
          </SupplierProvider>
        </GlobalSettingsProvider>
      </CollapseDrawerProvider>
    </SettingsProvider>
  );
}
