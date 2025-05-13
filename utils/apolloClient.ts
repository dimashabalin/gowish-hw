import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import fetch from 'cross-fetch';

export function createApolloClient(endpoint: string, token: string) {
  return new ApolloClient({
    link: new HttpLink({
      uri: endpoint,
      fetch,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: 'no-cache' },
      query: { fetchPolicy: 'no-cache' },
      mutate: { fetchPolicy: 'no-cache' },
    },
  });
}
