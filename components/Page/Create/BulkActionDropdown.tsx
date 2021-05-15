/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Btn = styled.button`
  background-color: #1890ff;
  border-radius: 2px;
  box-shadow: rgba(128, 128, 128, 0.1);
`;

const TwBtn = tw(Btn)`
text-white
text-sm
py-1
font-medium
px-10
flex
ml-8

`;

export const BulkActionDropdown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full py-3 px-5 border border-gray-300 shadow-sm bg-white text-sm font-normal text-gray-500 hover:bg-gray-50 focus:outline-none ">
              Bulk action
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute -right-25 mt-2 w-48 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none spac"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm border-b border-gray-200'
                      )}
                    >
                      Account settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm border-b border-gray-200'
                      )}
                    >
                      Support
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm border-b border-gray-200'
                      )}
                    >
                      License
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  <div className="py-2">
                    <div>
                      <TwBtn>Apply</TwBtn>
                    </div>
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
