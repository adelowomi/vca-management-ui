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
          id
          type
          image {
            small
            medium
            large
          }
          video{
            url

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
  query($accountId: String!,$filter:FilterInput,$limit: Int
    $skip: Int) {
    performances(accountId: $accountId,filter:$filter,limit: $limit, skip: $skip) {
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
          id
          type
          image {
            small
            medium
            large
          }
          video{
            url
            videoId
          }
        }
      }
    }
  }
`;

const GET_PERFORMANCE = gql`
  query ($filter: FilterInput, $accountId: String!) {
    performance(filter: $filter, accountId: $accountId) {
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
        start
        stop
        name
        description
        items {
          id
          mediaUrl
          description
          createdAt
          featured
          media{
            id
            type
            video{
              url
              videoId
            }
            image{ 
              small
              medium
              large
            }
          }
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
          type
          image {
            small
            medium
            large
          }
          video{
            url
            videoId
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
