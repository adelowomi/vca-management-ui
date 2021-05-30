import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import {
  RiArrowDownSLine,
  RiBarChartLine,
  RiFileEditLine,
  RiImageAddLine,
  RiLayoutLine,
  RiMapPinUserLine,
  RiNumbersLine,
  RiPagesLine,
  RiPaletteLine,
  RiSettings4Line,
} from 'react-icons/ri';
import styled from 'styled-components';

import { ExitIcon } from '../AssetsSVG';
import { PageSearchInput } from '../Page/Create/PageSearchInput';
interface AnchorTagProps {
  current: boolean;
}
const AnchorTag = styled.a<AnchorTagProps>`
  border-left: ${({ current }) => (current ? '8px solid #1890FF' : '')};
  background: ${({ current }) => (current ? ' rgba(24, 144, 255, 0.1)' : '')};
  color: ${({ current }) => (current ? '#1890FF' : 'rgba(75, 85, 99, 0.9)')};
  font-weight: ${({ current }) => (current ? '700' : '400')};

  :hover {
    background: ${({ current }) => (current ? '' : 'rgba(249, 250, 251, 0.9)')};
  }
`;

const navigation = [
  { name: 'Dashboard', href: 'dashboard', icon: RiNumbersLine, current: true },
  { name: 'Pages', href: 'pages', icon: RiLayoutLine, current: false },
  { name: 'News', href: 'news', icon: RiPagesLine, current: false },
  {
    name: 'Performance',
    href: 'performance',
    icon: RiBarChartLine,
    current: false,
  },
  { name: 'Posts', href: 'posts', icon: RiFileEditLine, current: false },
  {
    name: 'Media Gallery',
    href: 'media-gallery',
    icon: RiImageAddLine,
    current: false,
  },
  {
    name: 'Social',
    href: 'social',
    icon: RiMapPinUserLine,
    current: false,
  },
  {
    name: 'Style',
    href: 'style',
    icon: RiPaletteLine,
    current: false,
  },
  {
    name: 'Website Settings',
    href: 'website-settings',
    icon: RiSettings4Line,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    asPath,
    query: { siteId },
  } = useRouter();

  const routes = asPath.split('/');

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                  alt="Workflow"
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="flex-1 px- bg-white space-y-3">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-blue-100 border-blue-500 border-l-8 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-5 py-4 text-base font-normal'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              {/* sidebar footer */}
              <div className="flex-shrink-0 flex border-t border-gray-200 w-full py-5">
                <div className="flex flex-row items-center text-gray-500 justify- w-full space-x-5 ml-6">
                  <span className="cursor-pointer">{ExitIcon}</span>
                  <p>Exit website</p>
                </div>
              </div>
              {/* End of sidebar footer */}
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
            <div className="flex flex-row items-center flex-start flex-shrink-0 px-4">
              <button className="mr-2 pl-2 focus:outline-none">
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-10 w-6 text-black" aria-hidden="true" />
              </button>
              <p className="text-black font-medium text-lg">
                STORYBOARD<span className="text-black font-bold">VCA</span>
              </p>
            </div>
            <div className="mt-10 flex-grow flex flex-col">
              <nav className="flex-1 px- bg-white space-y-3">
                {navigation.map((item) => (
                  <AnchorTag
                    current={routes.includes(item.href) ? true : false}
                    key={item.name}
                    href={`/sites/${siteId}/${item.href}`}
                    className={classNames(
                      'group flex items-center px-5 py-4 text-base font-normal'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        routes.includes(item.href)
                          ? 'text-blue-400 text-base font-extrabold'
                          : 'text-gray-500 group-hover:text-gray-500',
                        'mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </AnchorTag>
                ))}
              </nav>
            </div>
            {/* sidebar footer */}
            <div className="flex-shrink-0 flex border-t border-gray-200 w-full py-5">
              <div className="flex flex-row items-center text-gray-500 justify- w-full space-x-5 ml-6">
                <span className="cursor-pointer">{ExitIcon}</span>
                <p>Exit website</p>
              </div>
            </div>
            {/* End of sidebar footer */}
          </div>
        </div>
      </div>
      {/*End of Static sidebar for desktop */}

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* nav bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6 text-black" aria-hidden="true" />
          </button>

          <div className="flex-1 px-4 flex justify-end items-center w-screen">
            <div className="flex flex-row items-center w-full justify-end space-x-3">
              <PageSearchInput />
              <div className="notification-icon-wrapper border-r border-gray-100 px-5">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">View notifications</span>

                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 18H19V11.031C19 7.148 15.866 4 12 4C8.134 4 5 7.148 5 11.031V18ZM12 2C16.97 2 21 6.043 21 11.031V20H3V11.031C3 6.043 7.03 2 12 2ZM9.5 21H14.5C14.5 21.663 14.2366 22.2989 13.7678 22.7678C13.2989 23.2366 12.663 23.5 12 23.5C11.337 23.5 10.7011 23.2366 10.2322 22.7678C9.76339 22.2989 9.5 21.663 9.5 21Z"
                      fill="black"
                    />
                    <circle
                      cx="19.5"
                      cy="9.5"
                      r="4.5"
                      fill="#1890FF"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
              <div className="user-dropdown-wrapper text-blue-500 ">
                <button
                  className="flex items-center space-x-1 font-bold focus:outline-none"
                  style={{ color: '#1890FF' }}
                >
                  <span>Username</span>
                  <RiArrowDownSLine className="h-5 w-4 " aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          {/* End of navbar */}
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="">
            <div className="max-w-7xl px-4 sm:p-6 md:p-8 bg-white m-auto">
              {/* Replace with your content */}
              {children}
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
