import { EDIT_ITEM, GET_ALL_ITEMS_QUERY } from '../graphql';
import { createApolloClient } from '../lib/apollo';
import { Item } from './schema';
import { GqlResponse } from './User';

let client;
export class Items {
  constructor(token: string) {
    client = createApolloClient(token);
  }

  public getAllItems = async ({
    accountId,
    filter,
    limit = 12,
    offset = 0,
  }: {
    filter;
    accountId: string;
    limit?: number;
    offset?: number;
  }): Promise<GqlResponse<Item[]>> => {
    try {
      const { data } = await client.query({
        query: GET_ALL_ITEMS_QUERY,
        variables: {
          accountId: accountId,
          filter: filter,
          limit: limit,
          offset: offset,
        },
      });
      if (!data.getAllItems) {
        console.error(data);
        return Promise.reject<GqlResponse<Item[]>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Item[]>>({
          data: data.getAllItems,
          error: null,
          status: false,
      })
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Item[]>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public removeFromPage = async ({
    itemId,
  }: {
    itemId: number;
  }): Promise<GqlResponse<Item>> => {
    try {
      const data = await client.mutate({
        mutation: EDIT_ITEM,
        variables: {
          updateItemInput: {
            pageId: null,
          },
          itemId: itemId,
        },
      });
      return Promise.resolve<GqlResponse<Item>>({
        data: data.updateItem,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Item>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public addToPage = async ({
    itemId,
    pageId,
  }: {
    itemId: string;
    pageId: string;
  }): Promise<GqlResponse<Item>> => {
    try {
      const data = await client.mutate({
        mutation: EDIT_ITEM,
        variables: {
          updateItemInput: {
            pageId: pageId,
          },
          itemId: itemId,
        },
      });
      return Promise.resolve<GqlResponse<Item>>({
        data: data.updateItem,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Item>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };
}
