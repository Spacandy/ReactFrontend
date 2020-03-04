// @flow

import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import apolloLogger from 'apollo-link-logger';
import createCache from './createCache';

const link = from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.warn(`[Network error]: ${networkError}`);
  }),
  ...(__DEV__ ? [apolloLogger] : []),
  new RetryLink(),
  new HttpLink({
    uri: '/graphql',
    credentials: 'include',
  }),
]);

const cache = createCache();

export default function createApolloClient() {
  return new ApolloClient({
    link,
    cache: cache.restore(window.App.apolloState),
    queryDeduplication: true,
    connectToDevTools: true,
  });
}
