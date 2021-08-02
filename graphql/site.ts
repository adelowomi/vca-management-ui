import gql from 'graphql-tag';

const SITE_QUERY = gql`
  query Site($id: String!, $accountId: String!) {
    site(id: $id, accountId: $accountId) {
      id
      name
      createdAt
      page
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
  query Sites($accountId: String!) {
    sites(accountId: $accountId) {
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
  mutation createSite($CreateSiteInput:CreateSiteInput!){
    createSite(createSiteInput: $CreateSiteInput){
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

export { GET_SITE_MENUITEMS, SITE_QUERY, SITES_QUERY };