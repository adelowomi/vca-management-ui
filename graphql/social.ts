import { gql } from '@apollo/client';

export const SOCIAL_QUERY = gql`
  query social($accountId: String!, $socialId: String!) {
    social(accountId: $accountId, socialId: $socialId) {
      id
      facebook
      instagram
      linkedin
      twitter
      isActive
    }
  }
`;

export const CREATE_SOCIAL = gql`
  mutation createSocial($createSocialInput: CreateSocialInput!) {
    createSocial(createSocialInput: $createSocialInput) {
      id
      facebook
      instagram
      linkedin
      twitter
      isActive
    }
  }
`;


export const UPDATE_SOCIAL = gql`
  mutation updateSocial($updateSocialInput: UpdateSocialInput!,$socialId: String!) {
    updateSocial(updateSocialInput: $updateSocialInput,socialId:$socialId) {
      id
      facebook
      instagram
      linkedin
      twitter
      isActive
    }
  }
`;

export const REMOVE_SOCIAL = gql`
mutation removeSocial($socialId: String) {
    removeSocial(socialId:$socialId) {
      id
      facebook
      instagram
      linkedin
      twitter
      isActive
    }
  }
`;

export const SOCIALS_QUERY = gql`
query socials($accountId: String!) {
  socials(accountId: $accountId) {
    id
    facebook
    instagram
    linkedin
    twitter
    isActive
    site
  }
}
`;

