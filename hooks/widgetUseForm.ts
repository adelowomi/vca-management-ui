import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import React from "react";
import { useToasts } from 'react-toast-notifications';

import { ADD_WIDGET } from "../graphql";
import { EDIT_WIDGET } from "../graphql/widget.gql";
import { WidgetErrorProps } from "../types/interfaces";

type WidgetStateProps = {
    widgetDescription: string
    widgetTitle: string
    widgetPageId: string | string[];
    widgetDisable: boolean
    widgetType: string
    widgetItems: string[],
};
export const widgetUseForm = (validate: any, client: ApolloClient<NormalizedCacheObject>, pageId: string | string[], widget: any) => {
    const getId = (arr: { id: string }[]) => {
        return arr.map(el => el.id)
    }

    const [state, setState] = React.useState<WidgetStateProps>({
        widgetDescription: widget && widget.description || '',
        widgetTitle: widget && widget.title || '',
        widgetPageId: pageId,
        widgetDisable: false,
        widgetType: 'ITEM',
        widgetItems: widget && getId(widget.items) || [],
    });
    // console.log('WIDGET STATE', state);

    const [errors, setErrors] = React.useState<WidgetErrorProps>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { addToast } = useToasts();

    const handleSubmit = (setOpen: any) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
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
                        description: state.widgetDescription,
                        disable: state.widgetDisable,
                        title: state.widgetTitle,
                        items: state.widgetItems,
                        page: state.widgetPageId,
                        type: state.widgetType,
                    },
                },
            });
            setState({
                widgetDescription: '',
                widgetTitle: '',
                widgetPageId: '',
                widgetDisable: false,
                widgetType: '',
                widgetItems: [],
            });
            setIsSubmitting(false);

            addToast('Widget is successfully created', { appearance: 'success' });
        } catch (error) {
            addToast('Widget could not be created!', { appearance: 'error' });
        }
    };


    const updateWidget = async () => {
        try {
            await client.mutate({
                mutation: EDIT_WIDGET,
                variables: {
                    updateWidgetInput: {
                        description: state.widgetDescription,
                        disable: state.widgetDisable,
                        title: state.widgetTitle,
                        items: state.widgetItems,
                        page: state.widgetPageId,
                        type: state.widgetType,
                    },
                    widgetId: widget.id
                },
            });
            setState({
                widgetDescription: '',
                widgetTitle: '',
                widgetPageId: '',
                widgetDisable: false,
                widgetType: '',
                widgetItems: [],
            });
            setIsSubmitting(false);

            addToast('Widget is successfully Edited', { appearance: 'success' });
        } catch (error) {
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
        if (Object.keys(errors).length === 0 && isSubmitting && !widget) {
            createWidget()
        }
        if (Object.keys(errors).length === 0 && isSubmitting && widget) {
            updateWidget()
        }


    }, [errors]);

    return { handleChange, state, handleSubmit, errors, setState };
};




