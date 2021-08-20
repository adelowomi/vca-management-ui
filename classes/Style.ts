
import { CREATE_STYLE } from '../graphql/style';
import { createApolloClient } from '../lib/apollo';
import { CreateStyleInput, Styles } from './schema';
import { GqlResponse } from './User';
let client;
export class Style {
  constructor(token: string) {
    client = createApolloClient(token);
  }

  public createSite = async ({
    input,
  }: {
    input: CreateStyleInput;
  }): Promise<GqlResponse<Styles>> => {
    try {
      const { data } = await client.query({
        query: CREATE_STYLE,
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
      return Promise.reject<GqlResponse<Styles>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };
}
