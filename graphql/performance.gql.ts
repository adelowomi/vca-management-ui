import { gql } from '@apollo/client';

const ADD_PERFORMANCE = gql`
  mutation ($createPerformanceInput: CreatePerformanceInput!) {
    createPerformance(createPerformanceInput: $createPerformanceInput) {
      year
      name
      description
      start
      stop
      menuItem
      # quarter {
      #   id
      #   name
      #   description
      # }
      hero {
        type
        caption
        mediaUrl
        heading
        hasAction
        actionText
        actionSlug
        location
        media {
          id
          image {
            small
            medium
            large
          }
        }
        stock {
          stockID
          exchange
        }
      }
    }
  }
`;

const EDIT_PERFORMANCE = gql`
  mutation (
    $updatePerformanceInput: UpdatePerformanceInput!
    $performanceId: String!
  ) {
    updatePerformance(
      updatePerformanceInput: $updatePerformanceInput
      performanceId: $performanceId
    ) {
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
        media {
          image {
            small
            medium
            large
          }
        }
        stock {
          stockID
          exchange
        }
      }
    }
  }
`;

const GET_PERFORMANCES = gql`
  query {
    performances {
      id
      name
      year
      description
      start
      stop
      menuItem
      # account
      createdAt
      hero {
        type
        caption
        mediaUrl
        heading
        hasAction
        actionText
        actionSlug
        location
        stock {
          stockID
        }

        media {
          image {
            small
            medium
            large
          }
        }
      }
    }
  }
`;

const GET_PERFORMANCE = gql`
  query ($filter: FilterInput) {
    performance(filter: $filter) {
      id
      name
      year
      description
      start
      stop
      menuItem
      # account
      createdAt
      quarter {
        id
        # start
        # stop
        name
        description
        items {
          id
          mediaUrl
          description
          createdAt
          featured
        }
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
        stock {
          stockID
        }

        media {
          id
          image {
            small
            medium
            large
          }
        }
      }
    }
  }
`;

const DELETE_PERFORMANCE = gql`
  mutation ($performanceId: String!) {
    removePerformance(performanceId: $performanceId) {
      id
    }
  }
`;

export {
  ADD_PERFORMANCE,
  DELETE_PERFORMANCE,
  EDIT_PERFORMANCE,
  GET_PERFORMANCE,
  GET_PERFORMANCES,
};
