import { Uppy } from '@uppy/core';
const Transloadit = require('@uppy/transloadit');
import '@uppy/core/dist/style.css';
import '@uppy/status-bar/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/file-input/dist/style.css';

import { Dashboard, StatusBar, useUppy } from '@uppy/react';
import { createHmac } from 'crypto';
import React, { useState } from 'react';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';

import FormSelect from '../../../../components/FormSelect/formSelect';
import Layout from '../../../../components/Layout/Layout';

interface FormInputProps {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  error: any;
}

export const FormInput = ({
  label,
  name,
  register,
  error = null,
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
          {...register(`${name}`, { required: true })}
          className={inputStyle}
          placeholder={`${name}`}
          aria-describedby={`${name}`}
        />
      </div>
      <p>{error?.type === 'required' && `${name} is required`}</p>
    </div>
  );
};

export const Login = ({ params, signature }) => {
  const [uploadError, setUploadError] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');
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
        const media = {
          name: 'name',
          description: 'description',
          image: {
            assembly: result['transloadit'][0]['assembly_id'],
            small: result['transloadit'][0]['results']['small'][0]['ssl_url'],
            medium: result['transloadit'][0]['results']['medium'][0]['ssl_url'],
            large: result['transloadit'][0]['results']['large'][0]['ssl_url'],
            xLarge: result['transloadit'][0]['results']['xlarge'][0]['ssl_url'],
          },
        };
        console.log(media);
        const url = result['transloadit'][0]['assembly_ssl_url'];
        setUploadUrl(url);
      })
      .on('error', () => {
        setUploadError(true);
      });
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // uppy.upload();
    console.log(data);
    console.log(errors);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex flex-row mt-12">
            <FormInput
              name="name"
              label="Name"
              register={register}
              error={errors.name}
            />
            <div className="ml-6">
              <FormInput
                name="description"
                label="Description"
                register={register}
                error={errors.description}
              />
            </div>
          </div>
          <div className="flex flex-row mt-6">
            <FormSelect
              label="Select type"
              onChange={(data) => setValue('type', data.name)}
              error={errors.type}
            />
          </div>
        </div>
        <StatusBar
          uppy={uppy}
          hideUploadButton
          hideAfterFinish={false}
          showProgressDetails
        />
        <Dashboard
          showProgressDetails={false}
          uppy={uppy}
          height={400}
          width="100%"
          hideUploadButton
        />
        <input type="Submit" />
      </form>
      <div>{uploadUrl}</div>
      <div>{uploadError}</div>
    </Layout>
  );
};

export default Login;

export function getServerSideProps() {
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
    },
  };
}
