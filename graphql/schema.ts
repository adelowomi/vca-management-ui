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

const PAGES_QUERY = gql`
  query Pages($siteId: String!) {
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
const ADD_WIDGET = gql`
  mutation CreateWidget($createWidgetInput: CreateWidgetInput!) {
    createWidget(createWidgetInput: $createWidgetInput) {
      description
      disable
      title
      items {
        mediaUrl
        slug
        id
      }
      page
      type
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
      createdBy {
        userId
        id
        userId
        firstName
        lastName
        phone
        businessName
        industry
        accountType
        createdAt
        updatedAt
        address {
          line
          lineAlt
          city
          state
          postalCode
          placeId
          country
          location {
            type
            coordinates
          }
        }
      }
      updatedBy {
        firstName
      }
      createdAt
      updatedAt
    }
  }
`;

export {
  ADD_PAGE,
  ADD_WIDGET,
  EDIT_PAGE,
  GET_ALL_ITEMS_QUERY,
  PAGE_QUERY,
  PAGES_QUERY,
  SITE_QUERY,
  SITES_QUERY,
  useMutationHook,
  useQueryHook,
};
