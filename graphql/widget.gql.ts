import { gql } from '@apollo/client';
const ADD_WIDGET = gql`
  mutation CreateWidget($createWidgetInput: CreateWidgetInput!) {
    createWidget(createWidgetInput: $createWidgetInput) {
      description
      disable
      title
      items {
        mediaUrl
        slug
        id
        content
        category
      }
      page
      type
    }
  }
`;
export {
    ADD_WIDGET,
};
