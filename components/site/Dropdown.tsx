import Popper from 'popper.js';
import React from 'react';

const Dropdown = ({ color }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef<any>();
  const popoverDropdownRef = React.createRef<any>();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === 'white'
    ? (bgColor = 'bg-indigo-500')
    : (bgColor = 'bg-' + color + '-500');
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={
                'text-white font-medium  text-lg px-6 py-2 flex rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ' +
                bgColor
              }
              style={{ transition: 'all .15s ease' }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {color === 'white' ? 'Save and Publish' : color + ' Dropdown'}
              <svg
                className="-mr-1 ml-2 h-5 w-5 text-lg font-bold"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? 'block ' : 'hidden ') +
                (color === 'white' ? 'bg-white ' : bgColor + ' ') +
                'text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1'
              }
              style={{ minWidth: '12rem' }}
            >
              <a
                href="#"
                className={
                  'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-indigo-100 ' +
                  (color === 'white' ? ' text-gray-800' : 'text-white')
                }
                onClick={(e) => e.preventDefault()}
              >
                Save
              </a>
              <a
                href="#"
                className={
                  'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent hover:bg-indigo-100 ' +
                  (color === 'white' ? ' text-gray-800' : 'text-white')
                }
                onClick={(e) => e.preventDefault()}
              >
                Publish
              </a>
              {/* <a
                href="#"
                className={
                  'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent ' +
                  (color === 'white' ? ' text-gray-800' : 'text-white')
                }
                onClick={(e) => e.preventDefault()}
              >
                Something else here
              </a> */}
              {/* <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" /> */}
              {/* <a
                href="#"
                className={
                  'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent ' +
                  (color === 'white' ? ' text-gray-800' : 'text-white')
                }
                onClick={(e) => e.preventDefault()}
              >
                Seprated link
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DropdownRender() {
  return (
    <>
      <Dropdown color="white" />
    </>
  );
}
