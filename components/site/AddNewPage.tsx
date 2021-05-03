import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as z from 'zod';

import { ADD_PAGE } from '../../graphql/schema';
import BreadCrumb from '../page/create/breadCrumb';
import { CallToAction } from '../page/create/callToAction';
import { PageControls } from '../page/create/pageControls';
import { PageHeaderStyle } from '../page/create/pageHeaderStyle';
import { Textposition } from '../page/create/textPosition';

const animatedComponents = makeAnimated();
const tags = [
  { value: 'bank', label: 'banks' },
  { value: 'economy', label: 'economy' },
  { value: 'finance', label: 'finance' },
  { value: 'country', label: 'country' },
  { value: 'church', label: 'church' },
  { value: 'tech', label: 'tech' },
];

const AddNewPage = ({ siteId }) => {
  const [header, setHeader] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [state, setState] = React.useState({
    pageTitle: '',
    site: siteId,
    mediaUrl: '',
    headerText: '',
    captionText: '',
    actionText: '',
    bodyTitle: '',
    bodyDescription: '',
    ctaLink: '',
    headerType: '',
    tags: [],
    location: '',
    hasAction: false,
  });
  const [createPage] = useMutation(ADD_PAGE);

  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setHeader(e.currentTarget.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const onSelectTags = (data: any) => {
    const arr = data.map((el) => el.value);
    setState({
      ...state,
      tags: arr,
    });
  };

  const setHasAction = (hasAction: boolean) => {
    setState({
      ...state,
      hasAction,
    });
  };

  const locationButtonClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setLocation(e.currentTarget.text);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    createPage({
      variables: {
        createPageInput: {
          name: state.pageTitle,
          tags: state.tags,
          site: state.site,
          hero: {
            caption: state.captionText,
            type: 'Bank',
            mediaUrl: state.mediaUrl,
            heading: state.headerText,
            hasAction: true,
            actoinText: state.actionText,
            actoinSlug: state.ctaLink,
            location: state.location,
          },
        },
      },
    });
  };

  React.useEffect(() => {
    setState({
      ...state,
      location: location.toUpperCase(),
      headerType: header,
    });
  }, [header, location]);

  const schema = z.object({
    pageTitle: z.string().nonempty({ message: 'Required' }),
  });

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="px-5">
      <BreadCrumb />
      <form
        action=""
        className="form mt-5"
        onSubmit={handleSubmit((data) => data)}
      >
        <PageControls
          handleChange={handleChange}
          onSubmit={onSubmit}
          register={register}
          title={state.pageTitle}
        />
        <div className="headerSection">
          <div className="mt-8 mb-1">
            <h3 className="ml-3 text-sm ">Header</h3>
          </div>
          <div className="rounded-lg text-sm  bg-white overflow-hidden shadow  px-3">
            <div className="mt-4 mb-3">
              <h3 className="text-sm ">Style</h3>
            </div>
            <PageHeaderStyle onButtonClick={onButtonClick} />
            <div className="inputSection mt-6 grid grid-cols-7">
              <div className=" col-span-3">
                <label className="text-gray-700 font-medium">Media URL</label>
                <input
                  name="mediaUrl"
                  value={state.mediaUrl}
                  onChange={handleChange}
                  type="text"
                  placeholder="https://star-studded-bricks-1440by551.png"
                  className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="inputSection2 mt-1 grid grid-cols-7">
              <div className=" col-span-3">
                <label className="text-gray-700 font-medium">Header Text</label>
                <input
                  type="text"
                  name="headerText"
                  value={state.headerText}
                  onChange={handleChange}
                  placeholder="RoloBank"
                  className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <Textposition locationButtonClick={locationButtonClick} />
            <div className="inputSection2 mt-5 grid grid-cols-7">
              <div className=" col-span-3">
                <label className="text-gray-700 font-medium">
                  Caption Text
                </label>
                <input
                  name="captionText"
                  value={state.captionText}
                  onChange={handleChange}
                  type="text"
                  placeholder="WE ARE A BANK OF THE YOUNG AND FOR YOUNG"
                  className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mt-1 mb-5 w-96">
              <label className="text-gray-700 font-medium">Tags</label>
              <Select
                isMulti
                name="tags"
                options={tags}
                className="basic-multi-select"
                classNamePrefix="select"
                components={animatedComponents}
                onChange={onSelectTags}
              />
            </div>
            <CallToAction
              hasAction={state.hasAction}
              actionText={state.actionText}
              ctaLink={state.ctaLink}
              handleChange={handleChange}
              setHasAction={setHasAction}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewPage;
