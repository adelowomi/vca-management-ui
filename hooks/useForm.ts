import Router from 'next/router';
import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { ADD_PAGE, EDIT_PAGE } from '../graphql';
import { stringToBoolean } from '../helpers/stringToBoolean';
import { ErrorProps } from '../types/interfaces';
interface StateProps {
  pageTitle: string;
  site: string | string[];
  menuItem: string;
  mediaUrl: string;
  headerText: string;
  captionText: string;
  actionText: string;
  ctaLink: string;
  headerType: string;
  tags: string[];
  location: string;
  hasAction: boolean | string;
  media: string;
}

const useForm = (
  validate: any,
  client: any,
  {
    siteId,
    pageId,
    page,
    type,
  }: {
    siteId?: string[] | string;
    pageId?: string[] | string;
    page?: any;
    type: string;
  }
) => {
  const [state, setState] = React.useState<StateProps>({
    pageTitle: page?.name || '',
    site: page?.site || siteId,
    menuItem: page?.menuItem || '',
    mediaUrl: page?.hero?.media?.image?.medium || '',
    headerText: page?.hero?.heading || '',
    captionText: page?.hero?.caption || '',
    actionText: page?.hero?.actionText || '',
    ctaLink: page?.hero?.actionSlug || '',
    headerType: page?.hero?.type || 'headerTypeOne',
    tags: page?.tags || ['tags'],
    location: page?.hero?.location || 'LEFT',
    hasAction: page?.hero?.hasAction?.toString() || 'false',
    media: page?.hero?.media?.id,
  });

  // eslint-disable-next-line
  const [errors, setErrors] = React.useState<ErrorProps>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { addToast } = useToasts();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrors(validate(state));
    setIsSubmitting(true);
  };

  const createPage = async () => {
    try {
      await client.mutate({
        mutation: ADD_PAGE,
        variables: {
          createPageInput: {
            name: state.pageTitle,
            tags: state.tags,
            site: state.site,
            menuItem: state.menuItem === '' ? null : state.menuItem,
            hero: {
              media: state.media,
              caption: state.captionText,
              type: state.headerType,
              mediaUrl: state.mediaUrl,
              heading: state.headerText,
              hasAction: stringToBoolean(state.hasAction.toString()),
              actionText: state.actionText,
              actionSlug: state.ctaLink,
              location: state.location.toLocaleUpperCase(),
            },
          },
        },
      });
      setState({
        pageTitle: '',
        site: siteId,
        menuItem: '',
        mediaUrl: '',
        headerText: '',
        captionText: '',
        actionText: '',
        ctaLink: '',
        headerType: 'headerTypeOne',
        tags: ['tags'],
        location: 'LEFT',
        hasAction: 'false',
        media: '',
      });

      addToast('Page is successfully Created', { appearance: 'success' });
      Router.reload();
    } catch (error) {
      addToast('Page could not be created!', { appearance: 'error' });
    }
  };
  const updatePage = async () => {
    try {
      await client.mutate({
        mutation: EDIT_PAGE,
        variables: {
          updatePageInput: {
            name: state.pageTitle,
            tags: state.tags,
            site: state.site,
            menuItem: state.menuItem === '' ? null : state.menuItem,
            hero: {
              media: state.media,
              caption: state.captionText,
              type: state.headerType,
              mediaUrl: state.mediaUrl,
              heading: state.headerText,
              hasAction: stringToBoolean(state.hasAction.toString()),
              actionText: state.actionText,
              actionSlug: state.ctaLink,
              location: state.location.toLocaleUpperCase(),
            },
          },
          pageId: pageId,
        },
      });
      addToast('Page is successfully Edited', { appearance: 'success' });
      Router.reload();
    } catch (error) {
      addToast('Page could not be Edited!', { appearance: 'error' });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting && type === 'add') {
      createPage();
    }
    if (Object.keys(errors).length === 0 && isSubmitting && type === 'edit') {
      updatePage();
    }
  }, [errors]);

  return { handleChange, state, handleSubmit, errors, setState };
};

export default useForm;
