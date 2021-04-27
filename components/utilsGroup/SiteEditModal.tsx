import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import React from 'react';

export default function SiteEditModal({
  open,
  setOpen,
  items,
  state,
  setState,
  onClick,
}) {
  const cancelButtonRef = useRef();
  const [selected, setSelected] = useState([]);
  const dataLimit = 3;
  const [currentPage, setCurrentPage] = React.useState(1);

  const onSelect = (id: string) => {
    const newArr = [...selected];
    const finder = newArr.findIndex((el) => el === id);
    if (newArr.length === 8) {
      if (finder > -1) {
        newArr.splice(finder, 1);
      }
      setSelected(newArr);
      return;
    }
    if (finder > -1) {
      newArr.splice(finder, 1);
    } else {
      newArr.push(id);
    }
    setSelected(newArr);
  };

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return items.slice(startIndex, endIndex);
  };
  React.useEffect(() => {
    setState({
      ...state,
      widgetItems: selected,
    });
  }, [selected]);
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

          {/* This element is to trick the browser into centering the modal contents. */}
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
            <div className="inline-block align-bottom bg-white w-full text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="bg-gray-200 h-20 flex justify-center items-center px-60">
                <div className="w-full">
                  <input
                    type="text"
                    className=" outline-none text-left pl-4  py-2 focus:ring-indigo-500 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between items-center px-16 mt-4">
                <div className="flex flex-row justify-between w-72 border- border-b-2 border-gray-100">
                  <div className="text-base font-light">
                    <h3>All Items</h3>
                  </div>
                  <div className="text-base font-light">
                    <h3>Selected({selected.length})</h3>
                  </div>
                </div>
                <div>
                  <button
                    className="flex rounded-lg bg-indigo-500 py-2 px-4 text-white"
                    onClick={onClick}
                  >
                    Done
                  </button>
                </div>
              </div>
              <div className="mx-16">
                <div className="text-indigo-500 text-sm italic font-light mt-5">
                  <h6>You can only add 8 items to a widget</h6>
                </div>
                <div className="mb-8 space-y-2 mt-3 cursor-pointer">
                  {getPaginatedData().map((item: any) => (
                    <div
                      className={`flex flex-row space-x-3 bg-gray-${
                        selected.findIndex((el: any) => el === item.id) > -1
                          ? '200'
                          : '50'
                      } py-3 transition duration-500 ease-in-out`}
                      key={item.id}
                      onClick={() => onSelect(item.id)}
                    >
                      <div>
                        LOGO
                        {/* <img src="../../assets/icons/logo.png" alt="" /> */}
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-indigo-500 uppercase">
                          {item.category}
                        </h3>
                        <p className="leading-6">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-200 h-20 flex flex-row justify-between px-5 items-center">
                <div className="outline-none">
                  <button
                    type="button"
                    className="flex border border-gray-300 rounded-lg bg-gray-200 py-2 px-4 text-black outline-none"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1 ? true : false}
                  >
                    Previous
                  </button>
                </div>
                <div className="outline">
                  <button
                    type="button"
                    className="flex border border-indigo-500 rounded-lg bg-gray-200 py-2 px-4 text-indigo-500 outline-none mr-10"
                    onClick={goToNextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
