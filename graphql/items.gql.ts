import { gql } from '@apollo/client';
const GET_ALL_ITEMS_QUERY = gql`
  query GetAllItems($filter: FilterInput) {
    getAllItems(filter: $filter) {
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
      account{
      firstName
      lastName
    }
      media {
        image {
          small
        }
        video{
          service
          url
        }
        document {
          url
        }
      }
    }
  }
`;

const GET_ITEM = gql`
  query GetAllItems($filter: FilterInput) {
    getAllItems(filter: $filter) {
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
      account{
      firstName
      lastName
    }
      media {
        image {
          small
        }
        video{
          service
          url
        }
        document {
          url
        }
      }
    }
  }
`;

const EDIT_ITEM = gql`
  mutation ($updateItemInput: UpdatedItemInput!, $itemId: String!) {
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

const ADD_ITEM = gql`
  mutation ($createItemInput: CreateItemInput!) {
    createItem(createItemInput: $createItemInput) {
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

const DELETE_ITEM = gql`
mutation($itemId: String!){
  removeItem(itemId: $itemId){
    id
  }
}


`;

export { ADD_ITEM, EDIT_ITEM, GET_ALL_ITEMS_QUERY, DELETE_ITEM, GET_ITEM };
