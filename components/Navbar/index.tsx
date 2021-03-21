import React from 'react';

interface InavbarProps {
  showSidebar: () => void;
}
const Navbar: React.FC<InavbarProps> = ({ showSidebar }) => {
  return (
    <>
      {/* <div className="flex flex-col w-0 flex-1 overflow-hidden"> */}
      <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button
          className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center text-xl rounded-md text-black hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={showSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          {/* Heroicon name: outline/menu */}
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* </div> */}
    </>
  );
};

export default Navbar;
