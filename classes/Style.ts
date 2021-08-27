import { CREATE_STYLE, GET_STYLE_BY_SITE, UPDATE_STYLE } from '../graphql/style';
import { createApolloClient } from '../lib/apollo';
import { CreateStyleInput, Styles, UpdateStyleInput } from './schema';
import { GqlResponse } from './User';
let client;
export class Style {
  constructor(token: string) {
    client = createApolloClient(token);
  }

  public createStyle = async ({
    input,
  }: {
    input: CreateStyleInput;
  }): Promise<GqlResponse<Styles>> => {
    try {
      const { data } = await client.mutate({
        mutation: CREATE_STYLE,
        variables: {
          CreateStyleInput: input,
        },
      });

      if (!data.createStyle) {
        return Promise.reject<GqlResponse<Styles>>({
          error: data,
          data: null,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Styles>>({
        data: data.createStyle,
        status: true,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Styles>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public updateStyle = async ({
    input,
    id,
  }: {
    input: UpdateStyleInput;
    id:string;
  }): Promise<GqlResponse<Styles>> => {
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_STYLE,
        variables: {
            UpdateStyleInput: input,
            StyleId:id
        },
      });

      if (!data.updateStyle) {
        return Promise.reject<GqlResponse<Styles>>({
          error: data,
          data: null,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Styles>>({
        data: data.updateStyle,
        status: true,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Styles>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };



  public getStyle = async ({
    siteId,
    accountId,
  }: {
    siteId: string;
    accountId: string;
  }): Promise<GqlResponse<Styles>> => {
    try {
      const { data } = await client.query({
        query: GET_STYLE_BY_SITE,
        variables: {
          siteId: siteId,
          accountId: accountId,
        },
      });
      if (!data.getStyleBySite) {
        console.error(data);
        return Promise.reject<GqlResponse<Styles>>({
          error: data,
          data: null,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Styles>>({
        data: data.getStyleBySite,
        status: true,
        error: null,
      });
    } catch (error) {
      return Promise.reject<GqlResponse<Styles>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };
}
