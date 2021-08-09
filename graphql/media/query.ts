import gql from 'graphql-tag';

export const GET_MEDIA = gql`
  query medias($filter: FilterInput, $accountId: String!) {
    medias(limit: 1, filter: $filter, accountId: $accountId) {
      id
      createdAt
      updatedAt
      name
      description
      type
      document {
        assembly
        url
      }
      video {
        service
        url
        videoId
      }
      image {
        assembly
        small
        medium
        large
        xLarge
      }
    }
  }
`;
