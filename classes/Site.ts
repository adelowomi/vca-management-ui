import { PAGES_QUERY, SITE_QUERY, SITES_QUERY } from '../graphql';
import {
  ADD_MENU_ITEM_TO_SITE,
  AVAILABLE_MENU_ITEMS,
  CREATE_SITE,
  DELETE_SITE_MENUITEM,
  REMOVE_SITE,
  UPDATE_SITE,
  UPDATE_SITE_MENUITEM,
} from '../graphql/site';
import { createApolloClient } from '../lib/apollo';
import {
  AvailableItems,
  CreateMenuitemInput,
  CreateSiteInput,
  FilterInput,
  Page,
  SiteView,
  UpdateMenuitemInput,
  UpdateSiteInput,
} from './schema';
import { GqlResponse } from './User';

let client;

export class Site {
  constructor(token: string) {
    client = createApolloClient(token);
  }

  public getAllSites = async ({
    accountId,
    skip,
    limit,
    filter,
  }: {
    accountId: string;
    skip?: number;
    limit?: number;
    filter?: FilterInput;
  }): Promise<GqlResponse<SiteView[]>> => {
    try {
      const data = await client.query({
        query: SITES_QUERY,
        variables: {
          accountId: accountId,
          skip: skip,
          limit: limit,
          filter: filter,
        },
      });
      return Promise.resolve<GqlResponse<SiteView[]>>({
        data: data.data.sites,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<SiteView[]>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public getSite = async ({
    siteId,
    accountId,
  }: {
    siteId: string;
    accountId: string;
  }): Promise<GqlResponse<SiteView>> => {
    try {
      const data = await client.query({
        query: SITE_QUERY,
        variables: {
          id: siteId,
          accountId: accountId,
        },
      });
      return Promise.resolve<GqlResponse<SiteView>>({
        data: data.data.site,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<SiteView>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public updateMenuItem = async ({
    input,
    menuId,
  }: {
    input: UpdateMenuitemInput;
    menuId: string;
  }): Promise<GqlResponse<SiteView>> => {
    try {
      const data = await client.mutate({
        mutation: UPDATE_SITE_MENUITEM,
        variables: {
          updateMenuItemInput: input,
          menuId: menuId,
        },
      });
      if (!data.data.updateSiteMenuItem) {
        console.error(data);
        return Promise.reject<GqlResponse<SiteView>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<SiteView>>({
        data: data.data.updateSiteMenuItem,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<SiteView>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public deleteMenuItem = async ({
    menuId,
  }: {
    menuId: string;
  }): Promise<GqlResponse<SiteView>> => {
    try {
      const data = await client.mutate({
        mutation: DELETE_SITE_MENUITEM,
        variables: {
          menuId: menuId,
        },
      });
      if (!data.data.deleteSiteMenuItem) {
        console.error(data);
        return Promise.reject<GqlResponse<SiteView>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<SiteView>>({
        data: data.data.deleteSiteMenuItem,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<SiteView>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public removeSite = async ({
    siteId,
  }: {
    siteId: string;
  }): Promise<GqlResponse<SiteView>> => {
    try {
      const { data } = await client.mutate({
        mutation: REMOVE_SITE,
        variables: {
          siteId: siteId,
        },
      });
      if (!data.removeSite) {
        console.error(data);
        return Promise.reject<GqlResponse<SiteView>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<SiteView>>({
        data: data.removeSite,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<SiteView>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public addMenuItem = async ({
    siteId,
    item,
  }: {
    siteId: string;
    item: CreateMenuitemInput;
  }): Promise<GqlResponse<SiteView>> => {
    try {
      const data = await client.mutate({
        mutation: ADD_MENU_ITEM_TO_SITE,
        variables: {
          siteId: siteId,
          menuItem: item,
        },
      });
      if (!data.data.addMenuItemToSite) {
        console.error(data);
        return Promise.reject<GqlResponse<SiteView>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<SiteView>>({
        data: data.data.addMenuItemToSite,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<SiteView>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public getAllPages = async ({
    accountId,
    filter,
  }: {
    accountId: string;
    filter: FilterInput;
  }): Promise<GqlResponse<Page[]>> => {
    try {
      const data = await client.query({
        query: PAGES_QUERY,
        variables: {
          filter: filter,
          accountId: accountId,
        },
      });
      if (!data.data.pages) {
        return Promise.reject<GqlResponse<Page[]>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Page[]>>({
        data: data.data.pages,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Page[]>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public updateSite = async ({
    input,
    siteId,
  }: {
    input: UpdateSiteInput;
    siteId: string;
  }): Promise<GqlResponse<SiteView>> => {
    try {
      const data = await client.mutate({
        mutation: UPDATE_SITE,
        variables: {
          UpdateSiteInput: input,
          siteId: siteId,
        },
      });
      if (!data.data.updateSite) {
        console.error(data);
        return Promise.reject<GqlResponse<SiteView>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<SiteView>>({
        data: data.data.updateSite,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<SiteView>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public createSite = async ({
    input,
    token,
  }: {
    input: CreateSiteInput;
    token: any;
  }): Promise<GqlResponse<SiteView>> => {
    try {
      const newClient = createApolloClient(token);
      const data = await newClient.mutate({
        mutation: CREATE_SITE,
        variables: {
          CreateSiteInput: input as CreateSiteInput,
        },
      });

      if (!data.data.createSite) {
        console.error(data);
        return Promise.reject<GqlResponse<SiteView>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<SiteView>>({
        data: data.data.createSite,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<SiteView>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public getAvailableItems = async ({
    siteId,
  }: {
    siteId: string;
  }): Promise<GqlResponse<AvailableItems[]>> => {
    try {
      const data = await client.query({
        query: AVAILABLE_MENU_ITEMS,
        variables: {
          siteId: siteId,
        },
      });
      if (!data.data.availableMenuItems) {
        console.error({ data });
        return Promise.reject<GqlResponse<AvailableItems[]>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<AvailableItems[]>>({
        data: data.data.availableMenuItems,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error({ error });
      
      return Promise.reject<GqlResponse<AvailableItems[]>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };
}
