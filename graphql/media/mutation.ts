import gql from 'graphql-tag';

export const CREATE_MEDIA = gql`
  mutation CreateMedia($createMediaInput: CreateMediaInput!) {
    createMedia(createMediaInput: $createMediaInput) {
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

export const GET_ALL_MEDIA = gql`
  query medias($limit: Int, $skip: Int) {
    medias(limit: $limit, skip: $skip) {
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
