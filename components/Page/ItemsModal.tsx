import { Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Fragment, useRef } from 'react';
import { IoFileTrayStackedOutline } from 'react-icons/io5';
import { RiCloseLine } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';

import { Items } from '../../classes/Items';
import {
  ComparisonOperatorEnum,
  Item,
  LogicalOperatorEnum,
} from '../../classes/schema';
import LoadingCard from '../utilsGroup/LoadingCard';
import { ItemCard } from './ItemCard';
import { Container2, H1, Row } from './PageStyledElements';

export const ItemsModal = ({
  open,
  close,
  existingItems,
  setNewItems,
  token,
  refresh,
  profile,
  type,
}: {
  open: boolean;
  close: any;
  existingItems: any[];
  setNewItems: any;
  token?: string;
  refresh?: any;
  profile?: any;
  type?: string;
}): JSX.Element => {
  const router = useRouter();
  const { addToast } = useToasts();
  const cancelButtonRef = useRef(undefined);
  const _thisItem = new Items(token);
  const [widgetItems, setWidgetItems] = useState<any[]>(existingItems ?? []);
  const [items, setItems] = useState<Item[]>();
  const [loading, setLoading] = useState(true);
  const [limit] = useState<number>(12);
  const [search, setSearch] = useState<string>();
  const { siteId } = router.query;
  const [page, setPage] = useState(1);

  const {
    query: { id: pageId },
  } = useRouter();

  const addOrRemoveItem = (item) => {
    if (widgetItems?.filter((i) => i.id == item.id)[0]) {
      const newItems = widgetItems.filter((i) => item.id != i.id);
      setWidgetItems(newItems);
      token && !type ? removeFromPage(item.id) : null;
      addToast('Removed Successfully', { appearance: 'success' });
      return;
    }
    if (widgetItems.length == 8 && !token) {
      addToast('You can only add 8 items to a widget', { appearance: 'error' });
      return;
    }
    const currentItems = widgetItems;
    console.error({ currentItems });
    const newItems = [...(currentItems as []), item];
    console.error({ newItems });

    setWidgetItems(newItems);
    token && !type ? addToPage(item.id) : null;
    addToast('Added Successfully', { appearance: 'success' });
    return;
  };

  const loadItems = async (page?: number, filter?: Record<string, unknown>) => {
    setLoading(true);
    try {
      const items = await (
        await _thisItem.getAllItems({
          accountId: profile.account.id,
          limit: limit,
          offset: limit * page,
          filter: filter
            ? filter
            : {
                combinedFilter: {
                  logicalOperator: LogicalOperatorEnum.And,
                  filters: [
                    {
                      singleFilter: {
                        field: 'account',
                        operator: ComparisonOperatorEnum.Eq,
                        value: profile.account.id,
                      },
                    },
                    {
                      singleFilter: {
                        field: 'siteId',
                        operator: ComparisonOperatorEnum.Eq,
                        value: siteId,
                      },
                    },
                  ],
                },
              },
        })
      ).data;
      console.error({ items });
      if (items.length <= 0) {
        setLoading(false);
        return;
      }
      setItems(items);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      return;
    }
  };

  const addToPage = async (id) => {
    try {
      const result = await _thisItem.addToPage({
        itemId: id,
        pageId: pageId as string,
      });
      console.error(result);
      router.replace(router.asPath);
      refresh();
    } catch (error) {
      console.error(error);
      const newItems = widgetItems.filter((item) => item != id);
      router.replace(router.asPath);
      setWidgetItems(newItems);
    }
  };

  const removeFromPage = async (id) => {
    try {
      const result = await _thisItem.removeFromPage({ itemId: id });
      console.error(result);
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
      const currentItems = widgetItems;
      const newItems = [...(currentItems as []), id];
      setWidgetItems(newItems);
      router.replace(router.asPath);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await loadItems();
    };
    getData();
  }, []);

  const nextPage = async () => {
    if (limit > items.length) {
      return;
    }
    await loadItems(page);
    setPage(page + 1);
    return;
  };
  const previousPage = async () => {
    if (page == 1) {
      return;
    }
    setPage(page - 1);
    await loadItems(page - 1 <= 1 ? 0 : page - 1);
    return;
  };

  const searchItems = async () => {
    const filter = {
      combinedFilter: {
        logicalOperator: LogicalOperatorEnum.And,
        filters: [
          {
            singleFilter: {
              field: 'siteId',
              operator: ComparisonOperatorEnum.Eq,
              value: siteId,
            },
          },
          {
            singleFilter: {
              field: 'featured',
              operator: 'REGEX',
              value: search ? search : '',
              options: 'i',
            },
          },
          {
            singleFilter: {
              field: 'description',
              operator: 'REGEX',
              value: search ? search : '',
              options: 'i',
            },
          },
        ],
      },
    };
    await loadItems(0, filter);
  };

  const addPosts = () => {
    // const selectedItems = widgetItems.map((item) => {
    //   return items.filter((i) => i.id == item)[0];
    // });
    setNewItems(widgetItems);
    token && !type ? router.reload() : null;
    close(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-x-0 bottom-0 top-1 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={close}
      >
        <div className="flex items-end justify-center min-h-screen  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white w-full text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full ">
              {!items ? (
                <div>
                  <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
                    <div className="flex justify-center items-center mb-2">
                      <IoFileTrayStackedOutline className="h-10 w-10 text-center text-vca-grey-1" />
                    </div>
                    <p className="mt-5 text-lg font-medium text-black text-opacity-50">
                      There are no Items in your site.
                    </p>
                    <div className="mt-6">
                      <Link
                        href={`/sites/${siteId}/posts/create`}
                        // className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
                      >
                        <button className="py-3.5 px-8 text-white rounded-sm font-bold text-sm focus:outline-none bg-vca-blue">
                          Create an item now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Container2>
                    <Row>
                      <H1 className="mb-10">Select Posts</H1>
                      <button
                        className="flex space-x-2 justify-center focus:outline-none"
                        type="button"
                        onClick={() => close(false)}
                      >
                        <span className="font-semibold text-base">Close</span>
                        <RiCloseLine className="h-6 w-5" aria-hidden="true" />
                      </button>
                    </Row>
                    <Row>
                      <div className="flex flex-row justify-start space-x-4">
                        <div className="w-">
                          <div
                            className="flex border-grey-light border bg-gray-50 py-1 w-96"
                            style={{ backgroundColor: '#F2F2F2' }}
                          >
                            <button className="focus:outline-none">
                              <span className="w-auto flex justify-end items-center text-grey p-2 outline-none">
                                <SearchIcon
                                  className="h-5 w-6 text-gray-500 font-light"
                                  aria-hidden="true"
                                />
                              </span>
                            </button>
                            <input
                              className="w-full rounded mr-4 bg-gray-200 outline-none"
                              type="text"
                              placeholder="Search"
                              style={{ backgroundColor: '#F2F2F2' }}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="ml-6 bg-vca-blue h-12 text-white font-bold text-sm"
                          onClick={async () => await searchItems()}
                        >
                          <div className="flex flex-row mx-8">
                            <div className="mr-2">Search</div>
                          </div>
                        </button>
                      </div>
                      <div>
                        <button
                          className="py-3.5 px-8 text-white rounded-sm font-bold text-sm focus:outline-none bg-vca-blue"
                          onClick={() => addPosts()}
                        >
                          Done
                        </button>
                      </div>
                    </Row>

                    <div className="grid grid-cols-4 gap-4 mt-8 mb-8">
                      {loading ? (
                        <>
                          <LoadingCard />
                          <LoadingCard />
                          <LoadingCard />
                          <LoadingCard />
                        </>
                      ) : items ? (
                        items.map((item: any) => (
                          <ItemCard
                            key={item.id}
                            item={item}
                            selected={
                              widgetItems?.filter((i) => i.id == item.id)[0]
                                ? true
                                : false
                            }
                            onSelect={addOrRemoveItem}
                          />
                        ))
                      ) : null}
                    </div>
                    <hr />
                    <div className="mt-9 flex flex-row justify-between mb-4">
                      <a className="flex flex-row">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                          </svg>
                        </div>
                        <div
                          className="ml-2 cursor-pointer"
                          onClick={async () => await previousPage()}
                        >
                          Previous
                        </div>
                      </a>

                      <span className="flex flex-row">
                        <div
                          className="mr-2 cursor-pointer"
                          onClick={async () => await nextPage()}
                        >
                          Next
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </div>
                      </span>
                    </div>
                  </Container2>
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
