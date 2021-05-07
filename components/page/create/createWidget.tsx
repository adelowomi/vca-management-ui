import { getSession } from '@auth0/nextjs-auth0';
import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { ADD_WIDGET } from '../../../graphql/schema';
import { createApolloClient } from '../../../lib/apollo';
import { NewsWidget } from '../../NewsWidget/NewsWidget';
import AddItemsModal from '../../utils-group/addItemsModal';

type WidgetProps = {
  pageId: string;
  token: string;
  items: {
    id: string;
    type: string;
    mediaUrl: string;
    slug: string;
    content: string;
    draft: string;
    featured: string;
    category: string;
    tags: [string];
    createdBy: {
      userId: string;
      id: string;
      firstName: string;
      lastName: string;
      phone: string;
      businessName: string;
      industry: string;
      accountType: string;
      createdAt: Date;
      updatedAt: Date;
      address: {
        line: string;
        lineAlt: null | string;
        city: string;
        state: string;
        postalCode: string;
        placeId: string;
        country: string;
        location: {
          type: string;
          coordinates: [number];
        };
      };
    };
    updatedBy: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
const CreateWidget: React.FC<WidgetProps> = ({
  pageId,
  token,
  items,
}): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [widgetData, setWidgetData] = React.useState<{
    description: string;
    disable: boolean;
    title: string;
    items: [string];
  }>();

  const client = createApolloClient(token);
  const { addToast } = useToasts();

  const [state, setState] = React.useState({
    widgetDescription: '',
    widgetTitle: '',
    widgetPageId: pageId,
    widgetDisable: false,
    widgetType: 'ITEM',
    widgetItems: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const createWidget = async () => {
    try {
      const {
        data: { createWidget },
      } = await client.mutate({
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
      setWidgetData({ ...createWidget });

      addToast('Widget is successfully created', { appearance: 'success' });
      setOpen(!open);
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
      setOpen(!open);
    }
  };

  return (
    <>
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
              Enable Widget
            </button>
          </div>
          <div className="inputSection mt-6 grid grid-cols-7">
            <div className=" col-span-3">
              <label className="text-gray-700 font-medium text-sm">Title</label>
              <input
                type="text"
                name="widgetTitle"
                value={state.widgetTitle}
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
                name="widgetDescription"
                value={state.widgetDescription}
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
              <div className="dropDown_wrapper flex flex-col">
                <button
                  onClick={() => setOpen(!open)}
                  type="button"
                  className="w-full mt-2 px-4 py-3 border bg-indigo-500 rounded-lg text-white  focus:outline-none focus:border-indigo-500"
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
          <div className="rounded-lg text-sm  bg-white  shadow  px-3 h-auto">
            {widgetData && widgetData.title && (
              <NewsWidget news={widgetData} contain />
            )}
          </div>
        </div>
      </div>
      <AddItemsModal
        open={open}
        setOpen={setOpen}
        items={items}
        state={state}
        setState={setState}
        onClick={createWidget}
      />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);
  return {
    props: {
      token: session.idToken,
    },
  };
}
export default CreateWidget;
