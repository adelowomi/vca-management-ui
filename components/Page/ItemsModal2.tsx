import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Fragment, useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';

import { Items } from '../../classes/Items';
import { ItemCard } from './ItemCard';
import { SelectButton } from './PageButtons/SelectButton';
import { PageSearchInput } from './PageSearchInput';
import { Container2, H1, Row } from './PageStyledElements';

const options = [
  { id: 'pageId', name: 'Page ID' },
  { id: 'type', name: 'Media type' },
];

export const ItemsModal2 = ({
  open,
  close,
  items,
  existingItems,
  setNewItems,
  token,
  refresh,
}: {
  open: boolean;
  close: any;
  items: any[];
  existingItems: any[];
  setNewItems: any;
  token?: string;
  refresh?: any;
}): JSX.Element => {
  const router = useRouter();
  const { addToast } = useToasts();
  const cancelButtonRef = useRef(undefined);
  const _thisItem = new Items(token);
  const [widgetItems, setWidgetItems] = useState<any[]>(
    existingItems?.map((item) => item.id) ?? []
  );

  const {
    query: { id: pageId },
  } = useRouter();


  const addOrRemoveItem = (id) => {
    if (widgetItems?.includes(id)) {
      console.error(widgetItems);
      const newItems = widgetItems.filter((item) => item != id);
      setWidgetItems(newItems);
      token ? removeFromPage(id) : null;
      addToast('Removed Successfully', { appearance: 'success' });
      return;
    }
    if (widgetItems.length == 8 && token) {
      addToast('You can only add 8 items to a widget', { appearance: 'error' });
      return;
    }
    const currentItems = widgetItems;
    console.error(currentItems);
    const newItems = [...(currentItems as []), id];
    setWidgetItems(newItems);
    token ? addToPage(id) : null;
    addToast('Added Successfully', { appearance: 'success' });
    return;
  };

  const addToPage = async (id) => {
    try {
      const result = await _thisItem.addToPage({ itemId: id, pageId: pageId as string });
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

  const addPosts = () => {
    const selectedItems = widgetItems.map((item) => {
      return items.filter((i) => i.id == item)[0];
    });
    setNewItems(selectedItems);
    token ? router.reload() : null;
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
            <div className="inline-block align-bottom bg-white w-full text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
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
                        <PageSearchInput />
                      </div>
                      <div className="w-60">
                        <SelectButton
                          name="filterBy"
                          py={2.5}
                          px={5}
                          caption="Filter by"
                          handleChange={() => {
                            return;
                          }}
                          value={''}
                          options={options}
                        />
                      </div>
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
                  <div className="grid grid-cols-4 gap-4 mt-8">
                    {items.map((item: any) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        selected={widgetItems?.includes(item.id)}
                        onSelect={addOrRemoveItem}
                      />
                    ))}
                  </div>
                </Container2>
              </>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
