/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Uppy } from '@uppy/core';
import { useUppy } from '@uppy/react';
import Transloadit from '@uppy/transloadit';
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';

import { CREATE_MEDIA } from '../../graphql/media/mutation';

export enum ContentType {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
}
export const CreateUploadinput = (result, uploadFormValues) => {
  let media = {};
  switch (uploadFormValues.type) {
    case ContentType.IMAGE:
      media = {
        name: uploadFormValues.name,
        description: uploadFormValues.description,
        type: uploadFormValues.type,
        image: {
          assembly: result['transloadit'][0]['assembly_id'],
          small: result['transloadit'][0]['results']['small'][0]['ssl_url'],
          medium: result['transloadit'][0]['results']['medium'][0]['ssl_url'],
          large: result['transloadit'][0]['results']['large'][0]['ssl_url'],
          xLarge: result['transloadit'][0]['results']['xlarge'][0]['ssl_url'],
        },
      };
      break;
    case ContentType.DOCUMENT:
      media = {
        name: uploadFormValues.name,
        description: uploadFormValues.description,
        type: uploadFormValues.type,
        document: {
          assembly: result['transloadit'][0]['assembly_id'],
          url: result['transloadit'][0]['results'][':original'][0]['ssl_url'],
        },
      };
      break;

    default:
      break;
  }
  return media;
};

export const CreateUppyInstance = (
  params: string,
  signature: string,
  getValues: UseFormGetValues<FieldValues>,
  setSuccess: (input: { id: string; message: any; type: string }) => void,
  setError: (error: any) => void,
  client: ApolloClient<NormalizedCacheObject>,
  setValue: UseFormSetValue<FieldValues>
) => {
  return useUppy(() => {
    return new Uppy({
      meta: { type: 'avatar' },
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: false,
    })
      .use(Transloadit, {
        params,
        signature,
        waitForEncoding: true,
      })
      .on('complete', (result) => {
        const uploadFormValues = getValues();
        const uploadedInput = CreateUploadinput(result, uploadFormValues);
        client
          .mutate({
            mutation: CREATE_MEDIA,
            variables: {
              createMediaInput: uploadedInput,
            },
          })
          .then(
            (values) => {
              setSuccess({
                id: values.data.createMedia.id,
                message: values,
                type: values.data.createMedia.type.toLowerCase(),
              });
            },
            (error) => {
              console.error(error);
              setError(true);
            }
          );
      })
      .on('file-added', (result) => {
        setValue('upload', result);
      })
      .on('file-removed', () => {
        setValue('upload', null);
      })
      .on('error', (error) => {
        console.error(error);
        setError(true);
      });
  });
};
