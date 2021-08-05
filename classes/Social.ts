import {
  CREATE_SOCIAL,
  REMOVE_SOCIAL,
  SOCIAL_QUERY,
  SOCIALS_QUERY,
  UPDATE_SOCIAL,
} from '../graphql/social';
import { createApolloClient } from '../lib/apollo';
import { CreateSocialInput, Social, UpdateSocialInput } from './schema';
import { GqlResponse } from './User';

let client;
export class Socials {
  constructor(token: string) {
    client = createApolloClient(token);
  }

  public getSocial = async ({
    socialId,
    accountId,
  }: {
    socialId: string;
    accountId: string;
  }): Promise<GqlResponse<Social>> => {
    try {
      const { data } = await client.query({
        query: SOCIAL_QUERY,
        variables: { socialId: socialId, accountId: accountId },
      });
      return Promise.resolve<GqlResponse<Social>>({
        data: data.social,
        status: true,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Social>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public getSocials = async ({
    accountId,
  }: {
    accountId: string;
  }): Promise<GqlResponse<Social[]>> => {
    try {
      const { data } = await client.query({
        query: SOCIALS_QUERY,
        variables: { accountId: accountId },
      });
      return Promise.resolve<GqlResponse<Social[]>>({
        data: data.socials,
        status: true,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Social[]>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public createSocial = async ({
    input,
  }: {
    input: CreateSocialInput;
  }): Promise<GqlResponse<Social>> => {
    try {
      const { data } = await client.mutate({
        mutation: CREATE_SOCIAL,
        variables: {
          createSocialInput: input,
        },
      });
      if (!data.createSocial) {
        console.error(data);
        return Promise.reject<GqlResponse<Social>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Social>>({
        data: data.createSocial,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Social>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public updateSocial = async ({
    input,
    socialId,
  }: {
    input: UpdateSocialInput;
    socialId: string;
  }): Promise<GqlResponse<Social>> => {
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_SOCIAL,
        variables: {
          updateSocialInput: input,
          socialId: socialId,
        },
      });
      if (!data.updateSocial) {
        console.error(data);
        return Promise.reject<GqlResponse<Social>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Social>>({
        data: data.updateSocial,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Social>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public removeSocial = async ({
    socialId,
  }: {
    socialId: string;
  }): Promise<GqlResponse<Social>> => {
    try {
      const { data } = await client.mutate({
        mutation: REMOVE_SOCIAL,
        variables: {
          socialId: socialId,
        },
      });
      if (!data.removeSocial) {
        console.error(data);
        return Promise.reject<GqlResponse<Social>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Social>>({
        data: data.removeSocial,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Social>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };
}
