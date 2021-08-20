import { gql } from '@apollo/client';

export const GET_STYLE_BY_SITE = gql`
query($siteId:String!,$accountId:String!){
    getStyleBySite(siteId:$siteId,accountId:$accountId){
        id
    }
}
`;

export const CREATE_STYLE = gql`
  mutation ($CreateStyleInput: createStyleInput!) {
    createStyle(createStyleInput: $CreateStyleInput) {
      id
    }
  }
`;
