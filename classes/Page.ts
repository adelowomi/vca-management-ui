import { ADD_PAGE, EDIT_PAGE, GET_WIDGET, PAGE_QUERY } from '../graphql';
import { createApolloClient } from '../lib/apollo';
import { CreatePageInput, FilterInput, Page, UpdatePageInput, Widget } from './schema';
import { GqlResponse } from './User';

let client;
export class Pages {
  constructor(token: string) {
    client = createApolloClient(token);
  }

  public createPage = async ({
    input,
  }: {
    input: CreatePageInput;
  }): Promise<GqlResponse<Page>> => {
    try {
      const data = await client.mutate({
        mutation: ADD_PAGE,
        variables: {
          createPageInput: input as CreatePageInput,
        },
      });

      if (!data.data.createPage) {
        console.error(data);
        return Promise.reject<GqlResponse<Page>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Page>>({
        data: data.data.createPage,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Page>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public updatePage = async ({
    input,
    pageId
  }: {
    input: UpdatePageInput;
    pageId: string;
  }): Promise<GqlResponse<Page>> => {
    try {
      const data = await client.mutate({
        mutation: EDIT_PAGE,
        variables: {
            updatePageInput: input as UpdatePageInput,
            pageId: pageId,
        },
      });

      if (!data.data.updatePage) {
        console.error(data);
        return Promise.reject<GqlResponse<Page>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Page>>({
        data: data.data.updatePage,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Page>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public getPage = async ({
    accountId,
    filter,
  }: {
    accountId: string;
    filter: FilterInput;
  }): Promise<GqlResponse<Page>> => {
    try {
      const { data } = await client.query({
        query: PAGE_QUERY,
        variables: {
          accountId: accountId,
          filter: filter,
        },
      });

      if (!data.page) {
        console.error(data);
        return Promise.reject<GqlResponse<Page>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Page>>({
        data: data.page,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Page>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public getWidget = async ({
    accountId,
    filter,
  }: {
    accountId: string,
    filter: FilterInput;
  }): Promise<GqlResponse<Widget>> => {
    try {
      const { data } = await client.query({
        query: GET_WIDGET,
        variables:{
            accountId: accountId,
            filter: filter,
        }
      });
      if (!data.widget) {
        console.error({data});
        return Promise.reject<GqlResponse<Widget>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Widget>>({
        data: data.widget,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Widget>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };
}
