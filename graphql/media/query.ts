import gql from 'graphql-tag';

export const GET_MEDIA = gql`
  query medias($filter: FilterInput) {
    medias(limit: 1, filter: $filter) {
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
      video
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

export const GET_MEDIA_BY_ACCOUNT = gql`
  query medias($accountId: String!) {
    medias(accountId: $accountId) {
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
        url
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
