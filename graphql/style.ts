import { gql } from '@apollo/client';

export const GET_STYLE_BY_SITE = gql`
  query ($siteId: String!, $accountId: String!) {
    getStyleBySite(siteId: $siteId, accountId: $accountId) {
      id
      body {
        bodyFont
        fontColor
        backgroundColor
        accentColor
      }
      navigation {
        fontColor
        backgroundColor
        accentColor
      }
      footer {
        fontColor
        backgroundColor
        accentColor
      }
      button {
        font
        buttonBorderStyle
        previewButton
      }
      primaryButton {
        fontColor
        hoverFontColor
        backgroundColor
        hoverBackgroundColor
      }
      secondaryButton {
        fontColor
        hoverFontColor
        backgroundColor
        hoverBackgroundColor
      }
    }
  }
`;

export const CREATE_STYLE = gql`
  mutation ($CreateStyleInput: CreateStyleInput!) {
    createStyle(createStyleInput: $CreateStyleInput) {
      id
    }
  }
`;

export const UPDATE_STYLE = gql`
  mutation ($UpdateStyleInput: UpdateStyleInput!,$StyleId:String!) {
    updateStyle(updateStyleInput: $UpdateStyleInput,styleId:$StyleId) {
      id
    }
  }
`;
