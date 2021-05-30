import { Uppy } from '@uppy/core';
const Transloadit = require('@uppy/transloadit');
import '@uppy/core/dist/style.css';
import '@uppy/status-bar/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Dashboard, StatusBar, useUppy } from '@uppy/react';
import { Modal, ModalBody, ModalHeader } from 'baseui/modal';
import { Spinner } from 'baseui/spinner';
import { createHmac } from 'crypto';
import React, { useState } from 'react';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';

import FormSelect from '../../../../components/FormSelect/formSelect';
import Layout from '../../../../components/Layout/Layout';
import { CREATE_MEDIA } from '../../../../graphql/media/mutation';
import { createApolloClient } from '../../../../lib/apollo';

interface FormInputProps {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  error: any;
  required?: boolean;
}

interface ImageType {
  image: {
    assembly: string;
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  };
}

export const FormInput = ({
  label,
  name,
  register,
  error = null,
  required = false,
}: FormInputProps) => {
  const inputStyle =
    error?.type === 'required'
      ? 'shadow-sm focus:ring-red-500 focus:border-red-500 focus:border-2 block w-96 h-14 sm:text-sm border border-red-500 rounded-sm pl-4'
      : 'shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:border-2 block w-96 h-14 sm:text-sm border border-gray-400 rounded-sm pl-4';
  return (
    <div>
      <label
        htmlFor={`${name}`}
        className="block text-xl text-gray-700 font-semibold"
      >
        {label}
      </label>
      <div className="mt-6">
        <input
          {...register(`${name}`, { required })}
          className={inputStyle}
          placeholder={`${name}`}
          aria-describedby={`${name}`}
        />
      </div>
      <p className=" text-vca-red mt-2">
        {error?.type === 'required' && `${name} is required`}
      </p>
    </div>
  );
};

const completeCallback = (result): ImageType => {
  const media = {
    image: {
      assembly: result['transloadit'][0]['assembly_id'],
      small: result['transloadit'][0]['results']['small'][0]['ssl_url'],
      medium: result['transloadit'][0]['results']['medium'][0]['ssl_url'],
      large: result['transloadit'][0]['results']['large'][0]['ssl_url'],
      xLarge: result['transloadit'][0]['results']['xlarge'][0]['ssl_url'],
    },
  };
  return media;
};

export const CreateMedia = ({ params, signature, token }) => {
  const [uploadError, setUploadError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const client = createApolloClient(token);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const uppy = useUppy(() => {
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
        const uploadedImage = completeCallback(result);
        const uploadFormValues = getValues();
        client
          .mutate({
            mutation: CREATE_MEDIA,
            variables: {
              createMediaInput: {
                name: uploadFormValues.name,
                description: uploadFormValues.description,
                type: 'IMAGE',
                image: uploadedImage.image,
              },
            },
          })
          .then(
            (values) => {
              console.log(values);
            },
            (error) => console.log(error)
          );
      })
      .on('file-added', (result) => {
        setValue('upload', result);
      })
      .on('file-removed', () => {
        setValue('upload', null);
      })
      .on('error', () => {
        setUploadError(true);
      });
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (showVideo) {
      console.log(data);
      console.log(errors);
      client
        .mutate({
          mutation: CREATE_MEDIA,
          variables: {
            createMediaInput: {
              name: data.name,
              description: data.description,
              type: 'VIDEO',
              video: data.video,
            },
          },
        })
        .then(
          (values) => {
            console.log(values);
          },
          (error) => console.log(error)
        );
    } else {
      await uppy.upload();
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    register('type', {
      required: true,
    });
    register('upload', {
      required: !showVideo,
    });
  }, [register, showVideo]);

  return (
    <Layout>
      <div className="">
        <div className="rounded-sm">
          <Modal closeable={false} isOpen={isLoading}>
            <ModalHeader>
              <div className="flex flex-row justify-center">Creating...</div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-row justify-center">
                <Spinner color="#1890FF" />
              </div>
            </ModalBody>
          </Modal>
        </div>
        <div className=" bg-white ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between mt-2">
                <div className="text-3xl text-vca-grey-1 font-bold">
                  Add New
                </div>
                <div className="flex flex-row">
                  <button
                    className=" bg-vca-grey-6 h-12 w-28 text-vca-grey-3 font-bold text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLoading(true);
                    }}
                  >
                    cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-6 bg-vca-blue h-12 text-white font-bold text-sm"
                  >
                    <div className="flex flex-row mx-8">
                      <div className="mr-2">Add to gallery</div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex flex-row mt-12">
                <FormInput
                  name="name"
                  label="Name"
                  register={register}
                  error={errors.name}
                  required={true}
                />
                <div className="ml-6">
                  <FormInput
                    name="description"
                    label="Description"
                    register={register}
                    error={errors.description}
                    required={true}
                  />
                </div>
              </div>
              <div className="flex flex-row mt-6">
                <FormSelect
                  label="Select type"
                  onChange={(data) => {
                    setValue('type', data.name);
                    if (data.name === 'Video') {
                      setShowVideo(true);
                    } else {
                      setShowVideo(false);
                    }
                  }}
                  error={errors.type}
                  errorText={'select a type'}
                />
                <div className={showVideo ? 'ml-6' : 'ml-6 hidden'}>
                  <FormInput
                    name="video"
                    label="Video URL"
                    register={register}
                    error={errors.video}
                    required={showVideo}
                  />
                </div>
              </div>
            </div>
            <div className={showVideo ? 'hidden' : 'mt-48'}>
              <Dashboard
                showProgressDetails={false}
                uppy={uppy}
                height={400}
                width="100%"
                hideUploadButton
              />
              <div className="mt-2 ml-4 text-base text-vca-red">
                {errors.upload?.type === 'required' && `A file is required`}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default withPageAuthRequired(CreateMedia);

export function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  const token = session.idToken;

  const utcDateString = (ms) => {
    return new Date(ms)
      .toISOString()
      .replace(/-/g, '/')
      .replace(/T/, ' ')
      .replace(/\.\d+Z$/, '+00:00');
  };

  // expire 1 hour from now (this must be milliseconds)
  const expires = utcDateString(+new Date() + 1 * 60 * 60 * 1000);
  const authKey = process.env.TRANSLOADIT_KEY;
  const authSecret = process.env.TRANSLOADIT_SECRET;

  const params = JSON.stringify({
    auth: {
      key: authKey,
      expires,
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    template_id: process.env.TRANSLOADIT_TEMPLATE_ID,
  });
  const signature = createHmac('sha1', authSecret)
    .update(Buffer.from(params, 'utf-8'))
    .digest('hex');

  return {
    props: {
      expires,
      signature,
      params,
      token,
    },
  };
}
