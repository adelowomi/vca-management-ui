import '@uppy/core/dist/style.css';
import '@uppy/status-bar/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Dashboard } from '@uppy/react';
import { Modal, ModalBody, ModalHeader } from 'baseui/modal';
import { StyledSpinnerNext } from 'baseui/spinner';
import { createHmac } from 'crypto';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormInput } from '../../../../components/FormInput/formInput';
import FormSelect from '../../../../components/FormSelect/VcaSelect';
import Layout from '../../../../components/Layout/Layout';
import ErrorModal from '../../../../components/Modal/ErrorModal';
import { CREATE_MEDIA } from '../../../../graphql/media/mutation';
import { createApolloClient } from '../../../../lib/apollo';
import {
  ContentType,
  CreateUppyInstance,
} from '../../../../lib/media/createMedia';

const options = [
  { id: 1, name: 'Image', value: ContentType.IMAGE, unavailable: false },
  { id: 2, name: 'Video', value: ContentType.VIDEO, unavailable: false },
  { id: 3, name: 'Document', value: ContentType.DOCUMENT, unavailable: false },
];

const CreateMedia = ({ imageParams, imageSignature, token }) => {
  const router = useRouter();
  const [uploadError, setUploadError] = useState<boolean>(false);
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

  const clientSuccessCallback = ({
    id,
    type,
  }: {
    id: string;
    message: any;
    type: string;
  }) => {
    router.push(`/sites/${router.query.siteId}/media/${id}/${type}`);
  };
  const uppy = CreateUppyInstance(
    imageParams,
    imageSignature,
    getValues,
    clientSuccessCallback,
    setUploadError,
    client,
    setValue
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (showVideo) {
      client
        .mutate({
          mutation: CREATE_MEDIA,
          variables: {
            createMediaInput: {
              name: data.name,
              description: data.description,
              type: data.type,
              video: data.video,
            },
          },
        })
        .then(
          (values) => {
            clientSuccessCallback({
              id: values.data.createMedia.id,
              type: values.data.createMedia.type.toLowerCase(),
              message: values,
            });
          },
          (error) => {
            console.error(error);
            setUploadError(true);
          }
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
                <StyledSpinnerNext color="#1890FF" />
              </div>
            </ModalBody>
          </Modal>
        </div>
        <ErrorModal open={uploadError} setOpen={setUploadError} />
        <div className=" bg-white m-10 ">
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
                      router.push(`/sites/${router.query.siteId}/media`);
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
                    setValue('type', data.value);
                    if (data.name === 'Video') {
                      setShowVideo(true);
                    } else {
                      setShowVideo(false);
                    }
                  }}
                  defaultOption={{
                    id: 0,
                    name: '',
                    value: null,
                    unavailable: false,
                  }}
                  options={options}
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

  const imageParams = JSON.stringify({
    auth: {
      key: authKey,
      expires,
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    template_id: process.env.TRANSLOADIT_IMAGE_TEMPLATE_ID,
  });
  const imageSignature = createHmac('sha1', authSecret)
    .update(Buffer.from(imageParams, 'utf-8'))
    .digest('hex');

  const documentParams = JSON.stringify({
    auth: {
      key: authKey,
      expires,
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    template_id: process.env.TRANSLOADIT_DOCUMENT_TEMPLATE_ID,
  });
  const documentSignature = createHmac('sha1', authSecret)
    .update(Buffer.from(documentParams, 'utf-8'))
    .digest('hex');

  return {
    props: {
      expires,
      imageSignature,
      imageParams,
      documentSignature,
      documentParams,
      token,
    },
  };
}
