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

export {
    GET_ALL_ITEMS_QUERY
}