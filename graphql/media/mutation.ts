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
