import createEmotionCache from "@/shared/theme/create-emotion-cache";
import createEmotionServer from "@emotion/server/create-instance";
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from "next/document";
import { ReactElement } from "react";

interface MyDocumentProps extends DocumentInitialProps {
  emotionStyleTags: ReactElement[];
}

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    // 서버 사이드에서 MSW 초기화
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_MSW_ENABLED === "true"
    ) {
      try {
        const { initMocks } = await import("@/mocks");
        await initMocks();
      } catch (error) {
        console.error("Server-side MSW initialization failed:", error);
      }
    }

    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) =>
          function EnhanceApp(props: any) {
            return <App emotionCache={cache} {...props} />;
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);

    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        key={style.key}
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      emotionStyleTags,
    };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>{this.props.emotionStyleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
