import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import DropdownRender from './Dropdown';

const animatedComponents = makeAnimated();
const tags = [
  { value: 'bank', label: 'banks' },
  { value: 'economy', label: 'economy' },
  { value: 'finance', label: 'finance' },
  { value: 'country', label: 'country' },
  { value: 'church', label: 'church' },
  { value: 'tech', label: 'tech' },
];

const ADD_PAGE = gql`
  mutation CreatePage($createPageInput: CreatePageInput!) {
    createPage(createPageInput: $createPageInput) {
      id
    }
  }
`;

const AddNewPage = ({ site }) => {
  console.log(site);
  const [header, setHeader] = React.useState('');
  const [state, setState] = React.useState({
    pageTitle: '',
    site,
    mediaUrl: '',
    headerText: '',
    captionText: '',
    actionText: '',
    bodyTitle: '',
    bodyDescription: '',
    ctaLink: '',
    headerType: '',
    tags: [],
    location: 'LEFT',
  });
  const [createPage, { data }] = useMutation(ADD_PAGE);

  const onButtonClick = (e: any) => {
    setHeader(e.target.value);
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const onSelect = (data: any) => {
    const arr = data.map((el) => el.value);
    setState({
      ...state,
      tags: arr,
    });
  };
  const onSubmit = (e: { preventDefault: () => void }) => {
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
      headerType: header,
    });
  }, [header]);
  // console.log(header);
  // console.log('STATE: ', state);

  return (
    <div className="px-5">
      <div className="breadCrumb">
        {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                {/* <!-- Heroicon name: solid/chevron-right --> */}
                <a
                  href="#"
                  className="font-medium text-base text-black hover:text-gray-700"
                >
                  Pages
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                {/* <!-- Heroicon name: solid/chevron-right --> */}
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link href="#">
                  <a
                    aria-current="page"
                    className="ml-4 text-base font-medium text-gray-500 hover:text-gray-700"
                  >
                    Add New
                  </a>
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <form action="" className="form mt-5">
        {/* <div className="grid grid-cols-3 gap-4"> */}
        <div className="flex flex-1 justify-between">
          <div className="w-72">
            <input
              type="text"
              name="pageTitle"
              value={state.pageTitle}
              onChange={handleChange}
              id="pageTitle"
              placeholder="Page Title"
              autoComplete="pageTitle"
              className="mt-1 block w-full border cursor-pointer border-gray-300 rounded-md shadow-sm py-3 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-600"
            />
          </div>
          <div className="">
            <div className="flex flex-1 items-center ">
              <div className="">
                <a
                  href="#"
                  className="text-base font-medium text-red-600 underline leading-6"
                >
                  Cancel all changes
                </a>
              </div>
              <div className="mx-10">
                <DropdownRender />
              </div>
              <div>
                <button className="px-5 py-3 text-lg font-medium rounded text-indigo-700 bg-indigo-100 leading-6">
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="headerSection">
          <div className="mt-8 mb-1">
            <h3 className="ml-3 text-sm ">Header</h3>
          </div>
          <div className="rounded-lg text-sm  bg-white overflow-hidden shadow  px-3">
            <div className="mt-4 mb-3">
              <h3 className="text-sm ">Style</h3>
            </div>
            <div className="header-button-group flex justify-start space-x-3 ">
              <button
                onClick={onButtonClick}
                value="headerTypeOne"
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Header Type 1
              </button>
              <button
                value="headerTypeTwo"
                onClick={onButtonClick}
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Header Type 2
              </button>
              <button
                value="headerTypeThree"
                onClick={onButtonClick}
                type="button"
                className="inline-flex items-center px-3 py-2 border  shadow-sm text-base font-medium rounded-md text-indigo-700 bg-indigo-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Header Type 3
              </button>
              <button
                value="headerTypeFour"
                onClick={onButtonClick}
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Header Type 4
              </button>
            </div>
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
            <div className="inputSection3 mt-1 ">
              <div className="">
                <label className="text-gray-700 font-medium">
                  Text Position
                </label>
                <div className="flex space-x-3 mt-2 text-gray-500">
                  <a
                    href="#"
                    className="focus:border-b-2 focus:border-blue-800 focus:text-blue-800  text-sm cursor-pointer "
                  >
                    Left
                  </a>
                  {/* <a
                    href="#"
                    className="text-sm text-blue-800 border-b-2 border-blue-800 focus:text-blue-800 cursor-pointer "
                  >
                    Right
                  </a> */}
                  <a
                    href="#"
                    className="text-sm focus:text-blue-800 cursor-pointer "
                  >
                    Right
                  </a>
                  <a
                    href="#"
                    className="text-sm cursor-pointer focus:text-blue-800"
                  >
                    Bottom
                  </a>
                </div>
              </div>
            </div>
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
                // defaultValue={[tags[2], tags[3]]}
                isMulti
                name="tags"
                options={tags}
                className="basic-multi-select"
                classNamePrefix="select"
                components={animatedComponents}
                onChange={onSelect}
              />
            </div>
            <div className="inputSection2 mt-1 grid grid-cols-7">
              <div className=" col-span-3">
                <label className="text-gray-700 font-medium">
                  Call To Actions Button
                </label>
                <div className="flex space-x-2 mt-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-400 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Inactive
                  </button>
                  <input
                    style={{ background: '#F2F2F2', color: '#A3A3A3' }}
                    name="actionText"
                    value={state.actionText}
                    onChange={handleChange}
                    type="text"
                    placeholder="Action Text"
                    className="inline-flex font-light items-center  pl-3  border border-gray-300 shadow-sm text-sm italic rounded-md text-gray-500  focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <input
                  style={{ background: '#F2F2F2', color: '#A3A3A3' }}
                  name="ctaLink"
                  value={state.ctaLink}
                  onChange={handleChange}
                  type="text"
                  placeholder="CTA (call to action)link"
                  className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg italic text-gray-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          <button
            onClick={onSubmit}
            type="button"
            className="inline-flex mt-4 items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            persist all
          </button>
          {/* First preview section */}
          <div>
            <div className="mb-2">
              <h3 className="ml-3 text-sm ">Preview</h3>
            </div>
            <div className="rounded-lg text-sm  bg-white overflow-hidden shadow  px-3 h-40"></div>
          </div>
          {/* End of first Preview Section */}
          <div className="bodySection mt-12">
            <div className="mb-1">
              <h3 className="ml-3 text-sm ">Body</h3>
            </div>
            <div className="rounded-lg text-sm  bg-white overflow-hidden shadow  px-3">
              <div className="buttons space-x-3 mt-5 flex">
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-2 border  shadow-sm text-base font-medium leading-7 rounded-md text-white bg-indigo-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:bg-white focus:text-gray-500"
                >
                  Add Widget
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-5 py-2 border  shadow-sm text-base font-medium rounded-md text-gray-500 bg-gray-100 focus:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:text-white"
                >
                  Add Item
                </button>
              </div>
              <div className="inputSection mt-6 grid grid-cols-7">
                <div className=" col-span-3">
                  <label className="text-gray-700 font-medium text-sm">
                    Title
                  </label>
                  <input
                    type="text"
                    name="bodyTitle"
                    value={state.bodyTitle}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>
              <div className="inputSection mt-1 grid grid-cols-7">
                <div className=" col-span-3">
                  <label className="text-gray-700 font-medium text-sm">
                    Description
                  </label>
                  <input
                    name="bodyDescription"
                    value={state.bodyDescription}
                    onChange={handleChange}
                    type="text"
                    className="w-full mt-2  px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>
              <div className="inputSection mt-1 mb-10 grid grid-cols-7">
                <div className=" col-span-3">
                  <label className="text-gray-700 font-medium text-sm">
                    Add Items
                  </label>
                  <button
                    type="button"
                    className="w-full mt-2 px-4 py-3 border bg-indigo-600 rounded-lg text-white  focus:outline-none focus:border-green-500"
                  >
                    Select from a list of posts
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="mb-2">
              <h3 className="ml-3 text-sm ">Preview</h3>
            </div>
            <div className="rounded-lg text-sm  bg-white overflow-hidden shadow  px-3 h-40"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewPage;
