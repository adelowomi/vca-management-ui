import gql from 'graphql-tag';

const SITE_QUERY = gql`
  query Site($id: String!, $accountId: String!) {
    site(id: $id, accountId: $accountId) {
      id
      name
      createdAt
      page
      social {
        instagram
        facebook
        twitter
        linkedin
      }
      header {
        name
        type
        logoUrl
        menuItems {
          id
          name
          slug
          description
          type
          active
        }
      }
    }
  }
`;

const SITES_QUERY = gql`
  query Sites(
    $accountId: String!
    $filter: FilterInput
    $limit: Int
    $skip: Int
  ) {
    sites(accountId: $accountId, filter: $filter, limit: $limit, skip: $skip) {
      id
      name
      createdAt
      header {
        name
        type
        logoUrl
        menuItems {
          id
          name
          slug
          description
          active
        }
      }
    }
  }
`;

const GET_SITE_MENUITEMS = gql`
  query {
    siteMenuItems {
      id
      name
      header {
        menuItems {
          id
          name
          slug
          description
          active
        }
      }
      page
    }
  }
`;
const GET_PROFILE = gql`
  query {
    getProfile {
      id
      firstName
      account {
        id
        firstName
        lastName
        phone
        businessName
        address {
          state
        }
        isActive
      }
    }
  }
`;

export const UPDATE_SITE_MENUITEM = gql`
  mutation updateSiteMenuItem(
    $updateMenuItemInput: UpdateMenuitemInput!
    $menuId: String!
  ) {
    updateSiteMenuItem(
      updateMenuitemInput: $updateMenuItemInput
      menuId: $menuId
    ) {
      id
      name
    }
  }
`;

export const ADD_MENU_ITEM_TO_SITE = gql`
  mutation addMenuItemToSite(
    $menuItem: CreateMenuitemInput!
    $siteId: String!
  ) {
    addMenuItemToSite(menuItem: $menuItem, siteId: $siteId) {
      id
      name
    }
  }
`;

export const DELETE_SITE_MENUITEM = gql`
  mutation deleteSiteMenuItem($menuId: String!) {
    deleteSiteMenuItem(menuId: $menuId) {
      id
    }
  }
`;

export const UPDATE_SITE = gql`
  mutation updateSite($UpdateSiteInput: UpdateSiteInput!, $siteId: String!) {
    updateSite(updateSiteInput: $UpdateSiteInput, id: $siteId) {
      id
      name
    }
  }
`;

export const CREATE_SITE = gql`
  mutation createSite($CreateSiteInput: CreateSiteInput!) {
    createSite(createSiteInput: $CreateSiteInput) {
      id
      name
    }
  }
`;

export const REMOVE_SITE = gql`
  mutation removeSite($siteId: String!) {
    removeSite(id: $siteId) {
      id
    }
  }
`;

export const AVAILABLE_MENU_ITEMS = gql`
  query availableMenuItems($siteId: String!){
    id
    name
  }
`;

export { GET_PROFILE, GET_SITE_MENUITEMS, SITE_QUERY, SITES_QUERY };
