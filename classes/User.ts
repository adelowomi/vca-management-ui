

import { GqlErrorResponse } from '../errors/GqlError';
import {
  CREATE_PROFILE_QUERY,
  PROFILE_QUERY,
  PROFILES_QUERY,
  SOFT_DELETE_USER,
  UPDATE_USER_PROFILE,
  USER_PROFILE_QUERY,
} from '../graphql/profile';
import { createApolloClient } from '../lib/apollo';
import { CreateProfileInput, Profile, UpdateProfileInput } from './schema';

let client;
export class User {
  constructor(token: string) {
    client = createApolloClient(token);
  }

  public getProfile = async (): Promise<GqlResponse<Profile>> => {
    try {
      const { data } = await client.query({ query: PROFILE_QUERY });
      return Promise.resolve<GqlResponse<Profile>>({
        data: data.getProfile,
        status: true,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Profile>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public getAllProfiles = async ({
    accountId,
  }: {
    accountId: string;
  }): Promise<GqlResponse<Profile[]>> => {
    try {
      const { data } = await client.query({
        query: PROFILES_QUERY,
        variables: { accountId: accountId },
      });
      return Promise.resolve<GqlResponse<Profile[]>>({
        data: data.profiles,
        status: true,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Profile[]>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public getUserProfile = async ({
    userId,
  }: {
    userId: string;
  }): Promise<GqlResponse<Profile>> => {
    try {
      const { data } = await client.query({
        query: USER_PROFILE_QUERY,
        variables: { userId: userId },
      });
      return Promise.resolve<GqlResponse<Profile>>({
        data: data.profile,
        status: true,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Profile>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public updateProfile = async ({
    input,
    userId,
  }: {
    input: UpdateProfileInput;
    userId: string;
  }): Promise<GqlResponse<Profile>> => {
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_USER_PROFILE,
        variables: { userId: userId, profileData: input },
      });
      if (!data.updateProfile) {
        console.error(data);
        return Promise.reject<GqlResponse<Profile>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Profile>>({
        data: data.updateProfile,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Profile>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public createProfile = async ({
    input,
  }: {
    input: CreateProfileInput;
  }): Promise<GqlResponse<Profile>> => {
    try {
      const { data } = await client.mutate({
        mutation: CREATE_PROFILE_QUERY,
        variables: {
          profile: input,
        },
      });
      if (!data.createProfile) {
        console.error(data);
        return Promise.reject<GqlResponse<Profile>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Profile>>({
        data: data.createProfile,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Profile>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };

  public softDelete = async ({
    userId,
  }: {
    userId: string;
  }): Promise<GqlResponse<Profile>> => {
    try {
      const { data } = await client.mutate({
        mutation: SOFT_DELETE_USER,
        variables: {
          userId: userId,
        },
      });
      if (!data.softDeleteProfile) {
        console.error(data);
        return Promise.reject<GqlResponse<Profile>>({
          data: null,
          error: data,
          status: false,
        });
      }
      return Promise.resolve<GqlResponse<Profile>>({
        data: data.softDeleteProfile,
        error: null,
        status: true,
      });
    } catch (error) {
      console.error(error);
      return Promise.reject<GqlResponse<Profile>>({
        data: null,
        error: error,
        status: false,
      });
    }
  };
}

export type GqlResponse<T> = {
  data: T;
  error: GqlErrorResponse;
  status: boolean;
};
