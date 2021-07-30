import gql from 'graphql-tag';

const GET_ALL_MEDIA = gql`
  query($filter: FilterInput, $accountId: String!) {
    medias(filter: $filter, accountId: $accountId) {
      id
      type
      name
      description
      document {
        url
      }
      # video
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
