import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import Router from 'next/router';
import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { ADD_PERFORMANCE, EDIT_PERFORMANCE } from '../graphql/performance.gql';
import { stringToBoolean } from '../helpers/stringToBoolean';
import { PerformanceErrorProps } from '../types/interfaces';

export const performanceUseForm = (
  validator: any,
  client: ApolloClient<NormalizedCacheObject>,
  {
    performance,
    type,
    performanceId,
  }: { performance?: any; type: string; performanceId?: string }
) => {
  const [state, setState] = React.useState({
    pageTitle: performance?.name || '',
    menuItem: performance?.menuItem || '',
    mediaUrl: performance?.hero?.mediaUrl || '',
    headerText: performance?.hero?.heading || '',
    captionText: performance?.hero?.caption || '',
    actionText: performance?.hero?.actionText || '',
    ctaLink: performance?.hero?.actionSlug || '',
    headerType: performance?.hero?.type || 'headerTypeOne',
    location: performance?.hero?.location || 'LEFT',
    hasAction: performance?.hero?.hasAction.toString() || 'false',
    media: performance?.hero?.media?.id || '',
    year: performance?.year || '',
    name: performance?.name || '',
    description: performance?.description || '',
    start: performance?.start || '',
    stop: performance?.stop || '',
    quarters: performance?.quarter || [],
    nasdaqId: performance?.hero?.stock?.stockID || '',
  });
  const [errors, setErrors] = React.useState<PerformanceErrorProps>({});

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { addToast } = useToasts();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrors(validator(state));
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const getId = (arr) => {
    return arr.map((el) => (el.id ? el.id : el));
  };

  const createPerformance = async () => {
    try {
      await client.mutate({
        mutation: ADD_PERFORMANCE,
        variables: {
          createPerformanceInput: {
            year: state.year,
            name: state.name,
            description: state.description,
            start: state.start,
            stop: state.stop,
            menuItem: state.menuItem,
            quarter: state.quarters.map(({ ...obj }) => {
              delete obj.id;
              obj.items = getId(obj.items);
              return obj;
            }),
            hero: {
              type: state.headerType,
              caption: state.captionText,
              mediaUrl: state.mediaUrl,
              heading: state.headerText,
              hasAction: stringToBoolean(state.hasAction),
              actionText: state.actionText,
              actionSlug: state.ctaLink,
              location: state.location,
              media: state.media,
              stock: {
                stockID: state.nasdaqId,
                exchange: 'NASDAQ',
              },
            },
          },
        },
      });
      addToast('Performance is successfully Created', {
        appearance: 'success',
      });
      Router.reload();
    } catch (error) {
      addToast('Performance could not be created!', { appearance: 'error' });
    }
  };
  const updatePerformance = async () => {
    try {
      await client.mutate({
        mutation: EDIT_PERFORMANCE,
        variables: {
          updatePerformanceInput: {
            year: state.year,
            name: state.name,
            description: state.description,
            start: state.start,
            stop: state.stop,
            menuItem: state.menuItem,
            quarter: state.quarters.map(({ ...obj }) => {
              delete obj.id;
              delete obj.mediaUrl;
              delete obj.__typename;

              obj.items = getId(obj.items);
              return obj;
            }),
            hero: {
              caption: state.captionText,
              type: state.headerType,
              mediaUrl: state.mediaUrl,
              heading: state.headerText,
              hasAction: stringToBoolean(state.hasAction),
              actionText: state.actionText,
              actionSlug: state.ctaLink,
              location: state.location.toLocaleUpperCase(),
              media: state.media,
              stock: {
                stockID: state.nasdaqId,
                exchange: 'NASDAQ',
              },
            },
          },
          performanceId,
        },
      });
      addToast('Performance is successfully Edited', { appearance: 'success' });
      Router.reload();
    } catch (error) {
      addToast('Performance could not be Edited!', { appearance: 'error' });
    }
  };
  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting && type === 'add') {
      createPerformance();
    }
    if (Object.keys(errors).length === 0 && isSubmitting && type === 'edit') {
      updatePerformance();
    }
  }, [errors]);

  return { errors, handleChange, handleSubmit, setState, state };
};
