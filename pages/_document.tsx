import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Provider as StyletronProvider } from 'styletron-react';

import { styletron } from '../styletron';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <StyletronProvider value={styletron}>
                <App {...props} />
              </StyletronProvider>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);

      // @ts-expect-error for styletron
      const stylesheets = styletron.getStylesheets() || [];
      return {
        ...initialProps,
        stylesheets,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
