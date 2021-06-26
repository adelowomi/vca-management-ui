import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { ADD_PERFORMANCE } from '../graphql/performance.gql';
import { PerformanceErrorProps } from '../types/interfaces';

export const performanceUseForm = (
  validator,
  client: ApolloClient<NormalizedCacheObject>,
  { performance, type }: { performance?: any; type: string }
) => {
  const [state, setState] = React.useState({
    pageTitle: performance?.name || '',
    menuItem: performance?.menuItem || '',
    mediaUrl: performance?.hero?.media.image?.medium || '',
    headerText: performance?.hero.heading || '',
    captionText: performance?.hero.caption || '',
    actionText: performance?.hero.actionText || '',
    ctaLink: performance?.hero.actionSlug || '',
    headerType: performance?.hero.type || 'headerTypeOne',
    tags: performance?.tags || ['tags'],
    location: performance?.hero?.location || 'LEFT',
    hasAction: performance?.hero?.hasAction.toString() || 'false',
    year: '',
    name: '',
    description: '',
    startDate: '',
    stopDate: '',
    quarters: [],
    nasdaqId: '',
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
  const createPerformance = async () => {
    try {
      await client.mutate({
        mutation: ADD_PERFORMANCE,
        variables: {
          createPerformanceInput: {
            year: state.year,
            name: state.name,
            description: state.description,
            start: state.startDate,
            stop: state.stopDate,
            menuItem: state.menuItem,

            quarter: state.quarters,
            hero: {
              type: state.headerType,
              caption: state.captionText,
              mediaUrl: state.mediaUrl,
              heading: state.headerText,
              hasAction: state.hasAction,
              actionText: state.actionText,
              actionSlug: state.ctaLink,
              location: state.location,
              media: 'media',
              stock: {
                stockID: state.nasdaqId,
                exchange: 'exchange',
              },
            },
          },
        },
      });
      addToast('Performance is successfully Created', {
        appearance: 'success',
      });
    } catch (error) {
      addToast('Performance could not be created!', { appearance: 'error' });
    }
  };

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting && type === 'add') {
      createPerformance();
    }
    if (Object.keys(errors).length === 0 && isSubmitting && type === 'edit') {
      //updatePerformance()
    }
  }, [errors]);

  return { errors, handleChange, handleSubmit, setState, state };
};
