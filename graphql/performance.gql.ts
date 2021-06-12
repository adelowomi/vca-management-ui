import { gql } from '@apollo/client';

const ADD_PERFORMANCE = gql`
  mutation($createPerformanceInput: CreatePerformanceInput!) {
    createPerformance(createPerformanceInput: $createPerformanceInput) {
      year
      name
      description
      start
      stop
      menuItem
      quarter {
        id
        name
        description
      }
      hero {
        type
        caption
        mediaUrl
        heading
        hasAction
        actionText
        actionSlug
        location
        media
        stock {
          stockID
          exchange
        }
      }
    }
  }
`;

const GET_PERFORMANCES = gql`
  query($filter: FilterInput) {
    performances(filter: $filter) {
      name
      description
      year
      start
      stop
      quarter {
        name
        description
        start
        stop
      }
    }
  }
`;

export { ADD_PERFORMANCE, GET_PERFORMANCES };
