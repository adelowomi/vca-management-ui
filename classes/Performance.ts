import {
  GET_PERFORMANCE,
  GET_PERFORMANCES,
} from '../graphql/performance.gql';
import { createApolloClient } from '../lib/apollo';
import { FilterInput, Performance } from './schema';
import { GqlResponse } from './User';

let client;
export class PerformanceClass {
  constructor(token: string) {
    client = createApolloClient(token);
  }

  getOneBySIte = async ({
    accountId,
    filter,
  }: {
    accountId: string;
    filter: FilterInput;
  }): Promise<GqlResponse<Performance>> => {
    try {
      const { data } = await client.query({
        query: GET_PERFORMANCE,
        variables: { accountId: accountId, filter: filter },
      });
      if (!data.performance) {
        return Promise.reject<GqlResponse<Performance>>({
          error: data,
          data: null,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Performance>>({
        data: data.performance,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Performance>>({
        error: error,
        data: null,
        status: false,
      });
    }
  };

  getAllBySite = async ({
    accountId,
    filter,
  }: {
    accountId: string;
    filter: FilterInput;
  }): Promise<GqlResponse<Performance[]>> => {
    try {
      const { data } =await client.query({
        query: GET_PERFORMANCES,
        variables: { accountId: accountId, filter: filter },
      });
      console.error(data);
      if (!data.performances) {
        return Promise.reject<GqlResponse<Performance[]>>({
          error: data,
          data: null,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Performance[]>>({
        data: data.performances,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Performance[]>>({
        error: error,
        data: null,
        status: false,
      });
    }
  };
}
