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
const GET_WIDGET = gql`
  query ($filter: FilterInput) {
    widget(filter: $filter) {
      id
      title
      type
      page
      description
      items {
        id
        featured
        description
        content
        media {
          image {
            small
            medium
            large
            xLarge
          }
        }
      }
    }
  }
`;
const EDIT_WIDGET = gql`
  mutation ($updateWidgetInput: UpdateWidgetInput!, $widgetId: String!) {
    updateWidget(updateWidgetInput: $updateWidgetInput, widgetId: $widgetId) {
      page
      description
      disable
      title
      items {
        content
        category
        draft
        mediaUrl
        slug
        id
      }
      page
      type
    }
  }
`;
export { ADD_WIDGET, EDIT_WIDGET, GET_WIDGET };
