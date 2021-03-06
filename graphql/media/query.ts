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

export const GET_MEDIA_BY_ACCOUNT = gql`
  query medias(
    $accountId: String!
    $limit: Int
    $offset: Int
    $filter: FilterInput
  ) {
    medias(
      accountId: $accountId
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
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

export const AVAILABLE_MENU_ITEMS = gql`
  query availableMenuItems($siteId: String!) {
    availableMenuItems(siteId: $siteId) {
      id
      name
    }
  }
`;
