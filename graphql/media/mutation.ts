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

export const GET_ALL_MEDIA = gql`
  query medias(
    $limit: Int
    $skip: Int
    $filter: FilterInput
    $accountId: String!
  ) {
    medias(limit: $limit, skip: $skip, filter: $filter, accountId: $accountId) {
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
