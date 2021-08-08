import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import {
  ADD_ITEM,
  DELETE_ITEM,
  // EDIT_ITEM,
  GET_ALL_ITEMS_QUERY,
  // GET_ITEM,
} from '../graphql/items.gql';
import { createApolloClient } from '../lib/apollo';
// import { CreateSocialInput, Social, UpdateSocialInput } from './schema';
// import { GqlResponse } from './User';

// let client;
export class Post {
  private client: ApolloClient<NormalizedCacheObject>;
  constructor(token: string) {
    this.client = createApolloClient(token);
  }

  public getPost = async ({ accountId, siteId, postId }: { accountId: string | string[], postId: string | string[]; siteId: string | string[] }) => {
    try {
      const {
        data: { getAllItems },
      } = await this.client.query({
        query: GET_ALL_ITEMS_QUERY,
        variables: {
          filter: {
            combinedFilter: {
              logicalOperator: 'AND',
              filters: [
                {
                  singleFilter: {
                    field: 'account',
                    operator: 'EQ',
                    value: accountId,
                  },
                },
                {
                  singleFilter: {
                    field: 'siteId',
                    operator: 'EQ',
                    value: siteId,
                  },
                },
                {
                  singleFilter: {
                    field: '_id',
                    operator: 'EQ',
                    value: postId,
                  },
                },
              ],
            },
          },
        },
      });
      return Promise.resolve({
        data: getAllItems,
        status: true,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public getPosts = async ({
    accountId,
    siteId,
  }: {
    accountId: string;
    siteId: string;
  }) => {
    try {
      const {
        data: { getAllItems },
      } = await this.client.query({
        query: GET_ALL_ITEMS_QUERY,
        variables: {
          filter: {
            combinedFilter: {
              logicalOperator: 'AND',
              filters: [
                {
                  singleFilter: {
                    field: 'account',
                    operator: 'EQ',
                    value: accountId,
                  },
                },
                {
                  singleFilter: {
                    field: 'siteId',
                    operator: 'EQ',
                    value: siteId,
                  },
                },
              ],
            },
          },
        },
      });
      return Promise.resolve({
        data: getAllItems,
        status: true,
        error: null,
      });

    } catch (error) {
      console.error(error);
      return Promise.reject({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public addPost = async ({ values }: { values: any }) => {
    try {
      const { data } = await this.client.mutate({
        mutation: ADD_ITEM,
        variables: {
          createSocialInput: values,
        },
      });

      return Promise.resolve({
        data: data,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public deletePost = async ({ itemId }: { itemId: string }) => {
    try {
      const { data } = await this.client.mutate({
        mutation: DELETE_ITEM,
        variables: {
          itemId,
        },
      });

      return Promise.resolve({
        data: data,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject({
        data: null,
        error: error,
        status: false,
      });
    }
  };
}
