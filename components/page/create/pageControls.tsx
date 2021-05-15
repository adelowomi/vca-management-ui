import * as React from 'react';
export interface PageControlsProps {
  title: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const PageControls = ({
  title,
  handleChange,
  onSubmit,
}: PageControlsProps) => {
  return (
    <div className="flex flex-1 justify-between">
      <div className="w-72">
        <input
          type="text"
          name="pageTitle"
          value={title}
          onChange={handleChange}
          id="pageTitle"
          placeholder="Page Title"
          autoComplete="pageTitle"
          className="mt-1 block w-full border cursor-pointer border-gray-300 rounded-md shadow-sm py-3 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-600"
        />
      </div>
      <div className="">
        <div className="flex flex-1 items-center ">
          <div className="">
            <a
              href="#"
              className="text-base font-medium text-red-600 underline leading-6"
            >
              Cancel all changes
            </a>
          </div>
          <div className="mx-10">
            <button
              onClick={onSubmit}
              type="submit"
              className="inline-flex items-center outline-none  px-6 py-2 border border-indigo-300 shadow-sm text-lg font-medium rounded-md text-white bg-indigo-500
              focus:outline-none
              "
            >
              Publish
            </button>
          </div>
          <div>
            <button className="px-5 py-3 text-lg font-medium rounded text-indigo-700 bg-indigo-100 leading-6">
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
