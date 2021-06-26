import gql from 'graphql-tag';

const GET_ALL_MEDIA = gql`
  query($limit: Int, $offset: Int, $filter: FilterInput) {
    medias(filter: $filter, limit: $limit, offset: $offset) {
      id
      type
      name
      description
      document {
        url
      }
      video
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
