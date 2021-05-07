import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useToasts } from 'react-toast-notifications';

import { tags } from '../../../../../assets/data/data';
import { BreadCrumb } from '../../../../../components/Page/create/BreadCrumb';
import { CallToAction } from '../../../../../components/Page/create/CallToAction';
import { CreateWidget } from '../../../../../components/Page/create/CreateWidget';
import { PageControls } from '../../../../../components/Page/create/PageControls';
import { PageHeaderStyle } from '../../../../../components/Page/create/PageHeaderStyle';
import { Textposition } from '../../../../../components/Page/create/TextPosition';
import AddMenuItemsDropdown from '../../../../../components/utilsGroup/addMenuItemsDropdown';
import MyDialog from '../../../../../components/utilsGroup/Modal';
import {
  EDIT_PAGE,
  GET_ALL_ITEMS_QUERY,
  GET_SITE_MENUITEMS,
  PAGE_QUERY,
} from '../../../../../graphql/schema';
import Layout from '../../../../../layouts/Dashboard';
import { createApolloClient } from '../../../../../lib/apollo';

const animatedComponents = makeAnimated();

const editPage = ({ page, token, items, error, menuItems }) => {
  if (error) {
    return <div>{error}</div>;
  }
  const [modalIsOpen, setModalOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(menuItems[0]);
  const client = createApolloClient(token);
  const [state, setState] = React.useState({
    pageTitle: page.name,
    site: page.site,
    mediaUrl: page.hero.mediaUrl,
    headerText: page.hero.heading,
    captionText: page.hero.caption,
    actionText: page.hero.actionText,
    ctaLink: page.hero.actionSlug,
    headerType: page.hero.type,
    tags: page.tags,
    menuItem: page.menuItem,
    location: page.hero.location,
    hasAction: page.hero.hasAction,
    widgetDescription: '',
    widgetTitle: '',
    widgetPageId: page.id,
    widgetDisable: false,
    widgetType: 'ITEM',
    widgetItems: [],
  });
  const { addToast } = useToasts();
  const [toggle, setToggle] = React.useState(state.hasAction);

  const closeModal = () => {
    setModalOpen(false);
  };
  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setState({
      ...state,
      headerType: e.currentTarget.dataset.headertype,
    });
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const onSelectTags = (data: any) => {
    const arr = data && data.map((el) => el.value);
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
  React.useEffect(() => {
    setState({ ...state, hasAction: toggle });
    setState({ ...state, menuItem: selected && selected.id });
  }, [toggle, selected]);

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await client.mutate({
        mutation: EDIT_PAGE,
        variables: {
          updatePageInput: {
            name: state.pageTitle,
            tags: state.tags,
            site: state.site,
            menuItem: state.menuItem,
            hero: {
              caption: state.captionText,
              type: state.headerType,
              mediaUrl: state.mediaUrl,
              heading: state.headerText,
              hasAction: toggle,
              actionText: state.actionText,
              actionSlug: state.ctaLink,
              location: state.location.toLocaleUpperCase(),
            },
          },
          pageId: page.id,
        },
      });
      addToast('Page is successfully Edited', { appearance: 'success' });
    } catch (error) {
      addToast('Page could not be created!', { appearance: 'error' });
    }

    setState({
      pageTitle: '',
      site: '',
      mediaUrl: '',
      headerText: '',
      captionText: '',
      actionText: '',
      ctaLink: '',
      headerType: '',
      menuItem: '',
      tags: [],
      location: '',
      hasAction: false,
      widgetDescription: '',
      widgetTitle: '',
      widgetPageId: '',
      widgetDisable: false,
      widgetType: '',
      widgetItems: [],
    });
    setToggle(false);
    setModalOpen(!modalIsOpen);
  };

  return (
    <Layout>
      <div className="px-5">
        <MyDialog
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          siteId={page.site}
        />
        <BreadCrumb type="edit" pageName={page.name} />

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
              <PageHeaderStyle onButtonClick={onButtonClick} state={state} />
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
                  <label className="text-gray-700 font-medium">
                    Header Text
                  </label>
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
                  defaultValue={[
                    {
                      value: state && state.tags && state.tags[0],
                      label: state && state.tags && state.tags[0],
                    },
                    {
                      value: state && state.tags && state.tags[1],
                      label: state && state.tags && state.tags[1],
                    },
                  ]}
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
            <CreateWidget pageId={page.id} items={items} token={token} />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { siteId, id: pageId } = ctx.query;
  const client = createApolloClient('');
  const session: Session = getSession(ctx.req, ctx.res);

  try {
    const {
      data: { page },
    } = await client.query({
      query: PAGE_QUERY,
      variables: {
        filter: {
          combinedFilter: {
            logicalOperator: 'OR',
            filters: [
              {
                singleFilter: {
                  field: '_id',
                  operator: 'EQ',
                  value: pageId,
                },
              },
              {
                singleFilter: {
                  field: 'site',
                  operator: 'EQ',
                  value: ctx.query.siteId,
                },
              },
            ],
          },
        },
      },
    });

    const {
      data: { getAllItems },
    } = await client.query({
      query: GET_ALL_ITEMS_QUERY,
      variables: {
        siteId: siteId,
        filter: {
          singleFilter: {
            field: 'pageId',
            operator: 'EQ',
            value: page.id,
          },
        },
      },
    });
    const {
      data: {
        siteMenuItems: {
          header: { menuItems },
        },
      },
    } = await client.query({
      query: GET_SITE_MENUITEMS,
      variables: {
        filter: {
          combinedFilter: {
            filters: [
              {
                singleFilter: {
                  field: 'siteId',
                  operator: 'EQ',
                  value: ctx.query.siteId,
                },
              },
            ],
          },
        },
      },
    });

    return {
      props: {
        page,
        token: session.idToken,
        items: getAllItems,
        menuItems,
      },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
}
export default withPageAuthRequired(editPage);
