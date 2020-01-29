import { ApolloLink } from 'apollo-boost';

const AuthLink = new ApolloLink((operation, forward) => {
  const context = operation.getContext();
  // simple example of middleware to ste headers if needed
  if (context.headers && context.headers['X-AUTH-TOKEN']) {
    return forward(operation);
  }
  operation.setContext({});
  return forward(operation);
});
export default AuthLink;
