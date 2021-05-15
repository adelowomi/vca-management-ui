import { Dialog, Transition } from '@headlessui/react';
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  ChevronDownIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  MenuIcon,
  NewspaperIcon,
  PhotographIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Pages', href: '/pages', icon: UsersIcon, current: false },
  { name: 'News', href: '/news', icon: NewspaperIcon, current: false },
  {
    name: 'Performance',
    href: '/performance',
    icon: CalendarIcon,
    current: false,
  },
  { name: 'Posts', href: '/posts', icon: InboxIcon, current: false },
  {
    name: 'Media Gallery',
    href: '/media-gallery',
    icon: PhotographIcon,
    current: false,
  },
  { name: 'Social', href: '/social', icon: MenuAlt2Icon, current: false },
  { name: 'Style', href: '/style', icon: ChartBarIcon, current: false },
  {
    name: 'Website Settings',
    href: '/website-settings',
    icon: NewspaperIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
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
            <div className="flex-shrink-0 flex border-t border-gray-200 p-"></div>
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
                />
              </div>
              <div className="notification-icon-wrapper border-r border-gray-100 px-5">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="user-dropdown-wrapper text-blue-500 ">
                <button className="flex items-center space-x-1 font-bold focus:outline-none">
                  <span>Username</span>
                  <ChevronDownIcon
                    className="h-5 w-4 font-bold"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
          {/* End of navbar */}
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
