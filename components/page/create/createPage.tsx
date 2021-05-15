import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useToasts } from 'react-toast-notifications';

import { tags } from '../../../assets/data/data';
import { ADD_PAGE } from '../../../graphql';
import { createApolloClient } from '../../../lib/apollo';
import { AddMenuItemsDropdown } from '../../utilsGroup/AddMenuItemsDropdown';
import { BreadCrumb } from './BreadCrumb';
import { CallToAction } from './CallToAction';
import { PageControls } from './PageControls';
import { PageHeaderStyle } from './PageHeaderStyle';
import { Textposition } from './TextPosition';

const animatedComponents = makeAnimated();

const CreatePage = ({ siteId, token, menuItems }) => {
  const [toggle, setToggle] = React.useState(false);
  const { addToast } = useToasts();
  const [selected, setSelected] = React.useState(menuItems[0]);

  const client = createApolloClient(token);

  const [state, setState] = React.useState({
    pageTitle: '',
    site: siteId,
    menuItems: '',
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
    hasAction: toggle,
  });

  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setState({
      ...state,
      headerType: e.currentTarget.dataset.headertype,
    });
  };

  React.useEffect(() => {
    setState({ ...state, hasAction: toggle });
    setState({ ...state, menuItems: selected && selected.id });
  }, [toggle, selected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const onSelectTags = (data) => {
    const arr = data.map((el) => el.value);
    setState({
      ...state,
      tags: arr,
    });
  };

  const locationButtonClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setState({
      ...state,
      location: e.currentTarget.text.toLowerCase(),
    });
  };
  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await client.mutate({
        mutation: ADD_PAGE,
        variables: {
          createPageInput: {
            name: state.pageTitle,
            tags: state.tags,
            site: state.site,
            menuItems: state.menuItems,
            hero: {
              caption: state.captionText,
              type: 'type',
              mediaUrl: state.mediaUrl,
              heading: state.headerText,
              hasAction: state.hasAction,
              actionText: state.actionText,
              actionSlug: state.ctaLink,
              location: state.location.toLocaleUpperCase(),
            },
          },
        },
      });

      addToast('Page is successfully Created', { appearance: 'success' });
    } catch (error) {
      addToast('Page could not be created!', { appearance: 'error' });
    }
  };

  return (
    <div className="px-5">
      <BreadCrumb type="Add New" />
      <form action="" className="form mt-5">
        <PageControls
          handleChange={handleChange}
          onSubmit={onSubmit}
          title={state.pageTitle}
        />
        <div className="headerSection">
          <div className="mt-8 mb-1 flex flex-row justify-between items-center">
            <div>
              <h3 className="ml-3 text-sm ">Header</h3>
            </div>
            <div className="pb-2">
              <AddMenuItemsDropdown
                menuItems={menuItems}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </div>
          <div className="rounded-lg text-sm  bg-white overflow-hidden shadow  px-3">
            <div className="mt-4 mb-3">
              <h3 className="text-sm ">Style</h3>
            </div>
            <PageHeaderStyle
              onButtonClick={onButtonClick}
              headerType={state.headerType}
            />
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
            <Textposition
              locationButtonClick={locationButtonClick}
              textPosition={state.location}
            />
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
              toggle={toggle}
              actionText={state.actionText}
              ctaLink={state.ctaLink}
              handleChange={handleChange}
              setToggle={setToggle}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreatePage;
