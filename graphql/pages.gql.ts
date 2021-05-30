
import { gql } from '@apollo/client';


const PAGES_QUERY = gql`
query Pages($limit: Int, $offset: Int, $filter: FilterInput) {
  pages(filter: $filter, limit: $limit, offset: $offset) {
    id
    name
    tags
    site
    createdAt
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

const PAGE_QUERY = gql`
query Page($limit: Int, $offset: Int, $filter: FilterInput) {
  page(filter: $filter, limit: $limit, offset: $offset) {
    id
    name
    tags
    site
    menuItem
    createdAt
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

const ADD_PAGE = gql`
mutation CreatePage($createPageInput: CreatePageInput!) {
  createPage(createPageInput: $createPageInput) {
    id
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
  mutation($updatePageInput: UpdatePageInput!, $pageId: String!) {
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
export {
  ADD_PAGE,
  EDIT_PAGE,
  PAGE_QUERY,
  PAGES_QUERY
}