import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { IncomingMessage, ServerResponse } from 'http';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

export function createApolloClient(authToken: string) {
  if (authToken === '') {
    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      uri: process.env.NEXT_PUBLIC_API_URL,
      cache: new InMemoryCache(),
      link: from([errorLink]),
    });
  }

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });
}

export function initializeApollo(initialState: any = null, authToken: string) {
  const _apolloClient = apolloClient ?? createApolloClient(authToken);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

function useApollo(initialState: any, authToken: string) {
  return useMemo(() => initializeApollo(initialState, authToken), [
    initialState,
  ]);
}

export { ApolloProvider, useApollo };
