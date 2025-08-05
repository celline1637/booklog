import ThemeProvider from "@/provider/global-theme";
import { LocalizationProvider } from "@/provider/localization-provider";
import { MSWProvider } from "@/provider/msw-provider";
import BaseQueryClientProvider from "@/provider/query-provider";
import createEmotionCache from "@/shared/theme/create-emotion-cache";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <MSWProvider>
      <CacheProvider value={emotionCache}>
        <BaseQueryClientProvider>
          <ThemeProvider>
            <LocalizationProvider>
              <Component {...pageProps} />
            </LocalizationProvider>
          </ThemeProvider>
        </BaseQueryClientProvider>
      </CacheProvider>
    </MSWProvider>
  );
}
