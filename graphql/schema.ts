import {
  gql,
  useQuery,
  useMutation
} from '@apollo/client';


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
    site(id: $id){
    id
    name
    header{
      name
      type
      logoUrl
      
    }
  }
  }
`;

const PAGES_QUERY = gql`
  query Page($siteId: String!) {
    pages(siteId: $siteId) {
      id
      name
      tags
      site
      createdAt
      createdBy{
      firstName
      lastName
      accountType
    }
      hero {
        type
        mediaUrl
        heading
        hasAction
        actoinText
        actoinSlug
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
      createdBy{
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
        actoinText
        actoinSlug
        location
      }
    }
  }
`;

const ADD_PAGE = gql`
  mutation CreatePage($createPageInput: CreatePageInput!) {
    createPage(createPageInput: $createPageInput) {
      id
    }
  }
`;

const EDIT_PAGE = gql`
  mutation updatePage($updatePageInput: UpdatePageInput!, $pageId: String!) {
    updatePage(updatePageInput: $updatePageInput, pageId: $pageId) {
      id
      name
      tags
      hero{
          type
          caption
          mediaUrl
          heading
          hasAction
          actoinText
          actoinSlug
          location
        }
    }
  }
`;
export {
  useQueryHook,
  useMutationHook,
  EDIT_PAGE,
  PAGES_QUERY,
  PAGE_QUERY,
  ADD_PAGE,
  SITE_QUERY,
  SITES_QUERY,

}