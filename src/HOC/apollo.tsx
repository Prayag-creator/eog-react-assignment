import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import React from 'react';

import AuthLink from '../graphql/middleware/authLink';
import refreshTokenMiddlewareLink from '../graphql/middleware/authRetryLink';

const httpLink = new HttpLink({
  uri: 'https://react.eogresources.com/graphql',
  // uri: `${process.env.REACT_APP_GRAPHQL_SERVER_URL}/graphql`,
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  connectToDevTools: true,
  cache,
  link: ApolloLink.from([AuthLink, refreshTokenMiddlewareLink, httpLink]),
});

export default function Apollo({ children }: any) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
