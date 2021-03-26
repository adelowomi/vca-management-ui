import '../styles/global.css';

import { gql } from '@apollo/client';
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
import { AppWrapper } from '../context/state';
import { ApolloProvider, createApolloClient, useApollo } from '../lib/apollo';
import { GlobalStyles, theme } from '../styles';
import { appThemes } from '../styles/baseui-theme';
import { styletron } from '../styletron';

const Container = styled.div`
  margin: 0 auto;
  font-family: 'Avenir Next';
`;

const SITE_QUERY = gql`
  query Sites {
    sites {
      id
      name
      header {
        name
        type
        menuItems {
          id
          name
          slug
          description
        }
      }
    }
  }
`;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { locale, defaultLocale } = useRouter();
  const messages = locales[locale];
  const apolloClient = useApollo(
    pageProps.initialApolloState,
    pageProps.idToken
  );

  // it is possible to have errors when the site is retiieved so we
  // handle the error TODO: create an error page for this error
  if (pageProps.sites?.error || pageProps.sites?.errors) {
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
                    <div>{`${pageProps.sites?.error}`}</div>
                    <div>{`${pageProps.sites?.errors}`}</div>
                  </Container>
                </IntlProvider>
              </ThemeProvider>
            </BaseProvider>
          </StyletronProvider>
        </ApolloProvider>
      </UserProvider>
    );
  }

  return (
    <AppWrapper value={pageProps.sites.data['sites'][0]}>
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
    </AppWrapper>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const session = await getSession(appContext.ctx.req, appContext.ctx.res);
  const appProps = await App.getInitialProps(appContext);

  if (!session) {
    return { pageProps: {} };
  }
  const client = createApolloClient(session.idToken);

  // Each user should have only one site and we need to retrieve it in order
  // to know what site we are configuring in the management UI
  const sites = await client.query({ query: SITE_QUERY });
  return {
    pageProps: {
      ...appProps.pageProps,
      ...session,
      sites,
    },
  };
};

export default MyApp;
