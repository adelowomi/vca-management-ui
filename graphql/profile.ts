import { gql } from '@apollo/client';

export const PROFILE_QUERY = gql`
  query {
    getProfile {
      id
      firstName
      account {
        id
      }
    }
  }
`;

export const PROFILES_QUERY = gql`
  query profiles($accountId: String!) {
    profiles(accountId: $accountId) {
      id
      userId
      firstName
      lastName
      accountType
      isActive
      createdAt
      account {
        id
      }
    }
  }
`;

export const USER_PROFILE_QUERY = gql`
  query profile($userId: String!) {
    profile(userId: $userId) {
      id
      userId
      firstName
      lastName
      accountType
      isActive
      createdAt
      account {
        id
      }
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateProfile($userId: String!, $profileData: UpdateProfileInput!) {
    updateProfile(userId: $userId, profileData: $profileData) {
      id
      firstName
      lastName
    }
  }
`;

export const CREATE_PROFILE_QUERY = gql`
  mutation createProfile($profile:CreateProfileInput!){
    createProfile(profile:$profile){
      id
      firstName
    }
  }
`;
