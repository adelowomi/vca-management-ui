import '../styles/global.css';

import { UserProvider } from '@auth0/nextjs-auth0';
import { BaseProvider, LightTheme } from 'baseui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { ToastProvider } from 'react-toast-notifications';
import styled, { ThemeProvider } from 'styled-components';
import { Provider as StyletronProvider } from 'styletron-react';

import * as locales from '../content/locale';
import { ApolloProvider, useApollo } from '../lib/apollo';
import { GlobalStyles, theme } from '../styles';
import { styletron } from '../styletron';

const Container = styled.div`
  margin: 0 auto;
  font-family: 'Avenir Next';
`;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { locale, defaultLocale } = useRouter();
  const messages = locales[locale];
  const apolloClient = useApollo(pageProps.initialApolloState, '');

  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>
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
                  <ToastProvider
                    autoDismiss={true}
                    autoDismissTimeout={4000}
                    transitionDuration={100}
                  >
                    <GlobalStyles />
                    <Component {...pageProps} />
                  </ToastProvider>
                </Container>
              </IntlProvider>
            </ThemeProvider>
          </BaseProvider>
        </StyletronProvider>
      </ApolloProvider>
    </UserProvider>
  );
};

export default MyApp;
