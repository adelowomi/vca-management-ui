export interface GqlErrorResponse {
  error: {
    message: any;
    graphQLErrors: any;
    networkError: {
      name: any;
      statusCode: any;
      result: any;
    };
  };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GqlErrorResponse = (error: any): GqlErrorResponse => {
  return {
    error: {
      message: error.message,
      graphQLErrors: error.graphQLErrors,
      networkError: {
        name: error.networkError?.name,
        statusCode: error.networkError?.statusCode,
        result: error.networkError?.result,
      },
    },
  };
};
