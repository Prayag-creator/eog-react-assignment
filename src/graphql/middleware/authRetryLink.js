import { onError } from 'apollo-link-error';

const refreshTokenMiddlewareLink = onError(
  ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(err => {
        const extensions = err.extensions || {};
        switch (extensions.statusCode) {
          case 401:
            // eslint-disable-next-line no-case-declarations
            // const { headers } = operation.getContext();
            // retry and get token if needed
            document.body.dispatchEvent(new CustomEvent('logout'));
            break;
          default:
          // return 1;
        }
      });
    }
    if (networkError) {
    }
  },
);

export default refreshTokenMiddlewareLink;
