import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import Router from 'next/router';
import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { ADD_WIDGET } from '../graphql';
import { EDIT_WIDGET } from '../graphql/widget.gql';
import { WidgetErrorProps } from '../types/interfaces';

type WidgetStateProps = {
  widgetDescription: string;
  widgetTitle: string;
  widgetPageId: string | string[];
  widgetDisable: boolean;
  widgetType: string;
  widgetItems: string[];
};
export const widgetUseForm = (
  validate: any,
  client: ApolloClient<NormalizedCacheObject>,
  pageId: string | string[],
  widget: any,
  accountId: string
) => {
  const getId = (arr: any) => {
    return arr.map((el: any) => (el.id ? el.id : el));
  };

  const [state, setState] = React.useState<WidgetStateProps>({
    widgetDescription: widget?.description || '',
    widgetTitle: widget?.title || '',
    widgetPageId: widget?.page || pageId,
    widgetDisable: false,
    widgetType: 'ITEM',
    widgetItems: widget?.items || [],
  });

  const [errors, setErrors] = React.useState<WidgetErrorProps>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { addToast } = useToasts();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrors(validate(state));
    setIsSubmitting(true);
    setOpen(false);
  };
  const createWidget = async () => {
    try {
      await client.mutate({
        mutation: ADD_WIDGET,
        variables: {
          createWidgetInput: {
            account: accountId,
            description: state.widgetDescription,
            disable: state.widgetDisable,
            title: state.widgetTitle,
            items: getId(state.widgetItems),
            page: state.widgetPageId,
            type: state.widgetType,
          },
        },
      });
      setIsSubmitting(false);

      addToast('Widget is successfully created', { appearance: 'success' });
      Router.reload();
    } catch (error) {
      setIsSubmitting(false);
      addToast('Widget could not be created!', { appearance: 'error' });
    }
  };

  const updateWidget = async () => {
    try {
      await client.mutate({
        mutation: EDIT_WIDGET,
        variables: {
          updateWidgetInput: {
            account: accountId,
            description: state.widgetDescription,
            disable: state.widgetDisable,
            title: state.widgetTitle,
            items: getId(state.widgetItems),
            page: state.widgetPageId,
            type: state.widgetType,
          },
          widgetId: widget.id,
        },
      });
      setIsSubmitting(false);

      addToast('Widget is successfully Edited', { appearance: 'success' });
      Router.reload();
    } catch (error) {
      setIsSubmitting(false);

      addToast('Widget could not be Edited!', { appearance: 'error' });
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
    if (Object.keys(errors).length === 0 && isSubmitting && widget.error) {
      createWidget();
    }
    if (Object.keys(errors).length === 0 && isSubmitting && widget.items) {
      updateWidget();
    }
  }, [errors]);

  return { handleChange, state, handleSubmit, errors, setState, open, setOpen };
};
