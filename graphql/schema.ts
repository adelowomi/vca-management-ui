import { gql, useQuery, useMutation } from '@apollo/client';


export const useQueryHook = useQuery;
export const useMutationHook = useMutation;
export const SITES_QUERY = gql`
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

export const SITE_QUERY = gql`
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

export const PAGES_QUERY = gql`
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

export const ADD_PAGE = gql`
  mutation CreatePage($createPageInput: CreatePageInput!) {
    createPage(createPageInput: $createPageInput) {
      id
    }
  }
`;