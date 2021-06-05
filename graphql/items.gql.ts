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
      mediaUrl
      slug
      content
      draft
      featured
      category
      tags
      createdAt
      updatedAt
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
