import '../styles/global.css';

import { getSession, UserProvider } from '@auth0/nextjs-auth0';
import { BaseProvider } from 'baseui';
import App, { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { IntlProvider } from 'react-intl';
import styled, { ThemeProvider } from 'styled-components';
import { Provider as StyletronProvider } from 'styletron-react';

import * as locales from '../content/locale';
import { ApolloProvider, useApollo } from '../lib/apollo';
import { GlobalStyles, theme } from '../styles';
import { appThemes } from '../styles/baseui-theme';
import { styletron } from '../styletron';

const Container = styled.div`
  margin: 0 auto;
  font-family: 'Avenir Next';
`;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { locale, defaultLocale } = useRouter();
  const messages = locales[locale];
  // if (!pageProps.idToken) {

  // }
  const apolloClient = useApollo(
    pageProps.initialApolloState,
    pageProps.idToken
  );

  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={appThemes}>
            <ThemeProvider theme={theme()}>
              <IntlProvider
                locale={locale}
                defaultLocale={defaultLocale}
                messages={messages}
              >
                <Head>
                  <title>Qaltrak</title>
                  <meta name="Description" content="Qaltrak" />
                </Head>
                <Container>
                  <GlobalStyles />
                  <Component {...pageProps} />
                </Container>
              </IntlProvider>
            </ThemeProvider>
          </BaseProvider>
        </StyletronProvider>
      </ApolloProvider>
    </UserProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const session = await getSession(appContext.ctx.req, appContext.ctx.res);
  const appProps = await App.getInitialProps(appContext);

  if (!session) {
    return { pageProps: {} };
  }

  return { pageProps: { ...appProps.pageProps, ...session } };
};

export default MyApp;
