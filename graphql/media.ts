import gql from 'graphql-tag';

const GET_ALL_MEDIA = gql`
  query ($filter: FilterInput, $accountId: String!, $limit: Int) {
    medias(filter: $filter, accountId: $accountId, limit: $limit) {
      id
      type
      name
      description
      document {
        url
      }
      video {
        service
        url
      }
      image {
        small
        medium
        large
        xLarge
      }
    }
  }
`;

export { GET_ALL_MEDIA };
