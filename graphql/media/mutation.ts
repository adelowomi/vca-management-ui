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
  query medias($limit: Int, $skip: Int, $filter: FilterInput) {
    medias(limit: $limit, skip: $skip, filter: $filter) {
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

export const REMOVE_MEDIA = gql`
  mutation removeMedia($mediaId: String!) {
    removeMedia(mediaId: $mediaId) {
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
