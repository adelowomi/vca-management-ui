import { gql } from '@apollo/client';

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

const GET_SITE_MENUITEMS = gql`
  query SiteMenuItems($limit: Int, $offset: Int, $filter: FilterInput) {
    siteMenuItems(filter: $filter, limit: $limit, offset: $offset) {
      id
      name
      header {
        menuItems {
          id
          name
          slug
          description
        }
      }
      page
    }
  }
`;

export { GET_SITE_MENUITEMS, SITE_QUERY, SITES_QUERY };
