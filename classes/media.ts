import { GET_MEDIA_BY_ACCOUNT } from '../graphql/media/query';
import { createApolloClient } from '../lib/apollo';
import { Media } from './schema';
import { GqlResponse } from './User';

let client;
export class MediaClass {
  constructor(token: string) {
    client = createApolloClient(token);
  }

  public getMedias = async ({
    accountId,
  }: {
    accountId: string;
  }): Promise<GqlResponse<Media[]>> => {
    try {
      const { data } = await client.query({
        query: GET_MEDIA_BY_ACCOUNT,
        variables: {
          accountId: accountId,
        },
      });
      return Promise.resolve<GqlResponse<Media[]>>({
        data: data,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error({ error });
      return Promise.reject<GqlResponse<Media[]>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };
}
