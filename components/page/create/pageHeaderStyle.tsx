import * as React from 'react';

export interface PageHeaderStyleProps {
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function PageHeaderStyle({ onButtonClick }: PageHeaderStyleProps) {
  return (
    <div className="header-button-group flex justify-start space-x-3 ">
      <button
        onClick={onButtonClick}
        value="headerTypeOne"
        type="button"
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Header Type 1
      </button>
      <button
        value="headerTypeTwo"
        onClick={onButtonClick}
        type="button"
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Header Type 2
      </button>
      <button
        value="headerTypeThree"
        onClick={onButtonClick}
        type="button"
        className="inline-flex items-center px-3 py-2 border  shadow-sm text-base font-medium rounded-md text-indigo-700 bg-indigo-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Header Type 3
      </button>
      <button
        value="headerTypeFour"
        onClick={onButtonClick}
        type="button"
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Header Type 4
      </button>
    </div>
  );
}
