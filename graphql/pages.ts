import { gql } from '@apollo/client';

const PAGES_QUERY = gql`
  query Pages($limit: Int, $offset: Int, $filter: FilterInput,$accountId: String!) {
    pages(filter: $filter, limit: $limit, offset: $offset,accountId:$accountId) {
      id
      name
      tags
      site
      menuItem
      hero {
        type
        caption
        mediaUrl
        heading
        hasAction
        actionText
        actionSlug
        location
        media {
          image {
            small
            medium
            large
          }
        }
      }
    }
  }
`;
const DELETE_PAGE = gql`
  mutation ($pageId: String!) {
    removePage(pageId: $pageId) {
      id
    }
  }
`;
const PAGE_QUERY = gql`
  query Page($accountId:String!,$filter: FilterInput) {
    page(filter: $filter,accountId: $accountId) {
      id
      name
      tags
      site
      menuItem
      createdAt
      hero {
        media {
          image {
            small
            medium
            large
          }
        }
        type
        caption
        mediaUrl
        heading
        hasAction
        actionText
        actionSlug
        location
      }
    }
  }
`;

const ADD_PAGE = gql`
  mutation CreatePage($createPageInput: CreatePageInput!) {
    createPage(createPageInput: $createPageInput) {
      id
      name
      tags
      hero {
        type
        caption
        mediaUrl
        heading
        hasAction
        actionText
        actionSlug
        location
      }
    }
  }
`;
const EDIT_PAGE = gql`
  mutation ($updatePageInput: UpdatePageInput!, $pageId: String!) {
    updatePage(updatePageInput: $updatePageInput, pageId: $pageId) {
      id
      name
      tags
      site
      menuItem
      hero {
        type
        caption
        mediaUrl
        heading
        hasAction
        actionText
        actionSlug
        location
      }
    }
  }
`;
export { ADD_PAGE, DELETE_PAGE, EDIT_PAGE, PAGE_QUERY, PAGES_QUERY };
