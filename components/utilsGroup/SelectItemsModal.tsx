import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import React from 'react';

import { WidgetStateProps } from '../../types/interfaces';
import { PostSelectWrapper } from '../Page/Create/PostsSelectWrapper';

interface SelectItemsModalProps {
  state: WidgetStateProps | any;
  // setState: React.Dispatch<
  //   React.SetStateAction<WidgetStateProps}>
  // >;
  setState: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: any;
  items: {
    id: string;
    mediaUrl: string;
    title: string;
    content: string;
  }[];
  type: string;
}
export const SelectItemsModal: React.FC<SelectItemsModalProps> = ({
  open,
  setOpen,
  setState,
  state,
  handleSubmit,
  items,
  type,
}): JSX.Element => {
  const cancelButtonRef = useRef();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-x-0 bottom-0 top-1 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
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
              <PostSelectWrapper
                setOpen={setOpen}
                setState={setState}
                state={state}
                handleSubmit={handleSubmit}
                items={items}
                type={type}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
