import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { useToasts } from 'react-toast-notifications';

import { UpdateMenuitemInput } from '../classes/schema';
import { Site } from '../classes/Site';
import { ADD_PERFORMANCE, EDIT_PERFORMANCE } from '../graphql/performance.gql';
import { stringToBoolean } from '../helpers/stringToBoolean';
import { PerformanceErrorProps } from '../types/interfaces';

export const performanceUseForm = (
  validator: any,
  client: ApolloClient<NormalizedCacheObject>,
  token: string,
  {
    performance,
    type,
    performanceId,
    account,
  }: {
    performance?: any;
    type: string;
    performanceId?: string;
    account: string;
  }
) => {
  const {
    query: { siteId },
  } = useRouter();
  const _thisSite = new Site(token);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const updateMenuItem = async () => {
    const data = { type: 'PERFORMANCE' };
    try {
      const result = await await _thisSite.updateMenuItem({
        input: data as unknown as UpdateMenuitemInput,
        menuId: state.menuItem,
      });
      if (!result.status) {
        addToast('An Error Occurred', { appearance: 'error' });
        return;
      }
      return;
    } catch (error) {
      console.error(error);
      addToast(
        error.error.message ? error.error.message : 'An error occurred',
        { appearance: 'error' }
      );
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, data?: any, field?: string) => {
    if (data) {
      setState({ ...state, [field]: data });
      return;
    }
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
    setLoading(true);
    try {
      await client.mutate({
        mutation: ADD_PERFORMANCE,
        variables: {
          createPerformanceInput: {
            account,
            year: state.year,
            site: siteId,
            name: state.name,
            description: state.description,
            start: state.start,
            stop: state.stop,
            menuItem: state.menuItem === '' ? null : state.menuItem,
            quarter: state.quarters.map(({ ...obj }) => {
              delete obj.id;
              obj.start ? obj : (obj.start = new Date());
              obj.stop ? obj : (obj.stop = new Date());
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
      setLoading(false);
      await updateMenuItem();
      router.push(`/sites/${siteId}/performance`);
    } catch (error) {
      setLoading(false);
      addToast('Performance could not be created!', { appearance: 'error' });
    }
  };
  const updatePerformance = async () => {
    setLoading(true);
    try {
      await client.mutate({
        mutation: EDIT_PERFORMANCE,
        variables: {
          updatePerformanceInput: {
            account,
            year: state.year,
            name: state.name,
            description: state.description,
            start: state.start,
            stop: state.stop,
            site: siteId,
            menuItem: state.menuItem === '' ? null : state.menuItem,
            quarter: state.quarters.map(({ ...obj }) => {
              delete obj.id;
              delete obj.mediaUrl;
              delete obj.__typename;
              obj.start ? obj : (obj.start = new Date());
              obj.stop ? obj : (obj.stop = new Date());

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
      setLoading(false);
      await updateMenuItem();
      router.push(`/sites/${siteId}/performance`);
      // Router.reload();
    } catch (error) {
      console.error(error);
      
      setLoading(false);
      addToast(error.message ? error.message : "Sorry, an error occurred", { appearance: 'error' });
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

  return { errors, handleChange, handleSubmit, setState, state, loading };
};
