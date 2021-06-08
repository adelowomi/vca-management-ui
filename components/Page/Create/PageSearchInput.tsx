import { SearchIcon } from '@heroicons/react/solid';
import React from 'react';

export const PageSearchInput = () => {
  return (
    <>
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
    </>
  );
};
