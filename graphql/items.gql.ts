import { gql } from '@apollo/client';
const GET_ALL_ITEMS_QUERY = gql`
  query GetAllItems(
    $limit: Int
    $offset: Int
    $filter: FilterInput
    $siteId: String!
  ) {
    getAllItems(
      filter: $filter
      limit: $limit
      offset: $offset
      siteId: $siteId
    ) {
      id
      type
      description
      content
      featured
      slug
      draft
      category
      mediaUrl
      createdAt
      updatedAt
      tags
      media {
        image {
          small
        }
        video
        document {
          url
        }
      }
    }
  }
`;

const EDIT_ITEM = gql`
  mutation($updateItemInput: UpdatedItemInput!, $itemId: String!) {
    updateItem(updateItemInput: $updateItemInput, itemId: $itemId) {
      id
      mediaUrl
      content
      category
      slug
      type
      featured
      description
      tags
    }
  }
`;

export { EDIT_ITEM, GET_ALL_ITEMS_QUERY };
