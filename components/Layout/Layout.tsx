import { Dialog, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import {
  RiBarChartLine,
  RiFileEditLine,
  RiFolder4Line,
  RiImageAddLine,
  RiLayoutLine,
  RiNumbersLine,
  RiPaletteLine,
  RiSettings4Line,
} from 'react-icons/ri';
import styled from 'styled-components';

import { ExitIcon } from '../AssetsSVG';
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

const adminNavigation = [
  {
    name: 'Sites',
    href: 'sites',
    icon: RiFolder4Line,
    current: true,
  },
  { name: 'Users', href: 'users', icon: FiUsers, current: false },
];

const navigation = [
  {
    name: 'Dashboard',
    href: 'dashboard',
    icon: RiNumbersLine,
    current: true,
  },
  { name: 'Pages', href: 'pages', icon: RiLayoutLine, current: false },
  // { name: 'News', href: 'news', icon: RiPagesLine, current: false },
  {
    name: 'Performance',
    href: 'performance',
    icon: RiBarChartLine,
    current: false,
  },
  {
    name: 'Posts',
    href: 'posts',
    icon: RiFileEditLine,
    current: false,
  },
  {
    name: 'Media Gallery',
    href: 'media',
    icon: RiImageAddLine,
    current: false,
  },
  // {
  //   name: 'Social',
  //   href: 'social',
  //   icon: RiMapPinUserLine,
  //   current: false,
  // },
  {
    name: 'Styles',
    href: 'styles',
    icon: RiPaletteLine,
    current: false,
  },
  {
    name: 'Website Settings',
    href: 'edit',
    icon: RiSettings4Line,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Layout({
  children,
  isPAdmin,
  profile,
}: {
  children: any;
  isPAdmin?: boolean;
  profile?: any;
}): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    asPath,
    query: { siteId },
  } = useRouter();

  const routes = asPath.split('/');

  return (
    <div className="h-screen flex overflow-hidden bg-white">
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
                <img className="h-8 w-auto" src="" alt="Workflow" />
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
                {isPAdmin
                  ? adminNavigation.map((item) => (
                      <AnchorTag
                        current={routes.includes(item.href) ? true : false}
                        key={item.name}
                        href={`/${item.href}`}
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
                    ))
                  : navigation.map((item) => (
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
            <Link href="/sites">
              <div className="flex-shrink-0 flex border-t border-gray-200 w-full py-5 hover:bg-vca-blue hover:bg-opacity-10 cursor-pointer">
                <div className="flex flex-row items-center text-gray-500 justify- w-full space-x-5 ml-6">
                  <span className="cursor-pointer">{ExitIcon}</span>
                  <p>Exit website</p>
                </div>
              </div>
            </Link>
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
              <div className="user-dropdown-wrapper text-blue-500 ">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border-0 px-4 py-2 bg-white font-bold text-sm text-blue-500 focus:outline-none">
                      {profile ? profile.firstName : 'Username'}
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white font-bold ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          <Link href="/api/logout">
                            <a
                              className="text-blue-500 block px-4 py-2 text-sm"
                            >
                              Logout
                            </a>
                          </Link>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {/* End of navbar */}
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="bg-white">
            {/* Replace with your content */}
            {children}
            {/* /End replace */}
          </div>
        </main>
      </div>
    </div>
  );
}
