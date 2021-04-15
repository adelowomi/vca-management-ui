import { gql, useMutation, useQuery } from '@apollo/client';

const useQueryHook = useQuery;
const useMutationHook = useMutation;
const SITES_QUERY = gql`
  query Sites {
    sites {
      id
      name
      header {
        name
        type
        menuItems {
          id
          name
          slug
          description
        }
      }
    }
  }
`;

const SITE_QUERY = gql`
  query Site($id: String!) {
    site(id: $id) {
      id
      name
      header {
        name
        type
        logoUrl
      }
    }
  }
`;

export const PAGES_QUERY = gql`
  query Page($siteId: String!) {
    pages(siteId: $siteId) {
      id
      name
      tags
      site
      createdAt
      createdBy {
        firstName
        lastName
        accountType
      }
      hero {
        type
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
  query Page($siteId: String!, $pageId: String!) {
    page(siteId: $siteId, pageId: $pageId) {
      id
      name
      tags
      site
      createdAt
      createdBy {
        firstName
        lastName
        accountType
      }
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
  mutation updatePage($updatePageInput: UpdatePageInput!, $pageId: String!) {
    updatePage(updatePageInput: $updatePageInput, pageId: $pageId) {
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
export {
  ADD_PAGE,
  EDIT_PAGE,
  PAGE_QUERY,
  SITE_QUERY,
  SITES_QUERY,
  useMutationHook,
  useQueryHook,
};
