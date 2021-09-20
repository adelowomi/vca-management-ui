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
    limit = 20,
    offset = 0,
    filter= {}
  }: {
    accountId: string;
    limit?: number;
    offset?: number;
    filter?: Record<string, unknown>; 
  }): Promise<GqlResponse<Media[]>> => {
    let variables;
    !filter ? variables = {
      accountId: accountId,
      limit: limit,
      offset: offset, 
    } :variables = {
      accountId: accountId,
      limit: limit,
      offset: offset,
      filter: filter,
    }  
    
    try {
      const { data } = await client.query({
        query: GET_MEDIA_BY_ACCOUNT,
        variables: variables,
      });
      
      return Promise.resolve<GqlResponse<Media[]>>({
        data: data.medias,
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
