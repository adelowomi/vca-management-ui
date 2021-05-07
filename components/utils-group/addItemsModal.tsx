import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import React from 'react';

import Tab from './Tab';

const AddItemsModal: React.FC<any> = ({
  open,
  setOpen,
  items,
  state,
  setState,
  onClick,
}): JSX.Element => {
  const cancelButtonRef = useRef();
  const [selected, setSelected] = useState([]);
  const dataLimit = 3;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedTab, setSelectedTabs] = React.useState('allItems');
  const tabs = ['allItems', 'selectedItems'];

  const onSelect = (item) => {
    const newArr = [...selected];
    const finder = newArr.findIndex((el) => el.id === item.id);
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
      newArr.push(item);
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

  const onClickTabButton = (e: any) => {
    if (e.target.dataset.selected === tabs[0]) {
      setSelectedTabs(tabs[0]);
    } else {
      setSelectedTabs(tabs[1]);
    }
    return;
  };

  React.useEffect(() => {
    setState({
      ...state,
      widgetItems: selected.map((el) => el.id),
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
                {/* ______ */}
                <div className="flex flex-row justify-between w-72 border- border-b-2 border-gray-100">
                  <div
                    className={`text-base font-light cursor-pointer transition duration-700 ease-in-out ${
                      selectedTab === tabs[0]
                        ? 'border-b-2 border-indigo-600 -mb-0 '
                        : ''
                    }`}
                  >
                    <h3 data-selected="allItems" onClick={onClickTabButton}>
                      All Items
                    </h3>
                  </div>
                  <div
                    className={`text-base font-light cursor-pointer transition duration-700 ease-in-out ${
                      selectedTab === tabs[1]
                        ? 'border-b-2 border-indigo-600 -mb-0'
                        : ''
                    }`}
                  >
                    <h3 data-selected="selectedItem" onClick={onClickTabButton}>
                      Selected({selected.length})
                    </h3>
                  </div>
                </div>
                <div>
                  <button
                    className="flex rounded-lg bg-indigo-500 py-2 px-4 text-white"
                    onClick={() => onClick(setSelected)}
                  >
                    Done
                  </button>
                </div>
              </div>
              <div className="mx-16">
                <div className="text-indigo-500 text-sm italic font-light mt-5">
                  <h6>You can only add 8 items to a widget</h6>
                </div>
                <div className="mb-8 space-y-2 mt-3 cursor-pointer transition duration-500 ease-in-out">
                  <Tab isSelected={selectedTab === tabs[0]}>
                    {getPaginatedData().map((item: any) => (
                      <div
                        className={`transition duration-500 ease-in-out flex flex-row space-x-3 bg-gray-${
                          selected.findIndex((el: any) => el.id === item.id) >
                          -1
                            ? '200'
                            : '50'
                        } py-3 transition duration-500 ease-in-out`}
                        key={item.id}
                        onClick={() => onSelect(item)}
                      >
                        <div>LOGO</div>
                        <div className="flex flex-col">
                          <h3 className="text-indigo-500 uppercase">
                            {item.category}
                          </h3>
                          <p className="leading-6">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </Tab>
                  <Tab isSelected={selectedTab === tabs[1]}>
                    {selected.map((item: any) => (
                      <div
                        className={`transition duration-500 ease-in-out flex flex-row space-x-3 bg-gray-${
                          selected.findIndex((el: any) => el.id === item.id) >
                          -1
                            ? '200'
                            : '50'
                        } py-3 transition duration-500 ease-in-out`}
                        key={item.id}
                        onClick={() => onSelect(item)}
                      >
                        <div>LOGO</div>
                        <div className="flex flex-col">
                          <h3 className="text-indigo-500 uppercase">
                            {item.category}
                          </h3>
                          <p className="leading-6">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </Tab>
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
};

export default AddItemsModal;
