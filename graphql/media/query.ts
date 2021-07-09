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
