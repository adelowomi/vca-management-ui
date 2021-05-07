import * as React from 'react';

export interface PageHeaderStyleProps {
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  state: any;
}

export function PageHeaderStyle({
  onButtonClick,
  state,
}: PageHeaderStyleProps) {
  return (
    <div className="header-button-group flex justify-start space-x-3 ">
      <button
        onClick={onButtonClick}
        value="headerTypeOne"
        data-headertype="headerTypeOne"
        type="button"
        className={`
      ${
        state && state.headerType === 'headerTypeOne'
          ? 'bg-indigo-200 text-indigo-600 '
          : ''
      }
      inline-flex items-center px-3 py-2 border shadow-sm text-base font-medium rounded-md text-gray-500 focus:outline-none 
     
      `}
      >
        Header Type 1
      </button>
      <button
        value="headerTypeTwo"
        data-headertype="headerTypeTwo"
        onClick={onButtonClick}
        type="button"
        className={`
      ${
        state && state.headerType === 'headerTypeTwo'
          ? 'bg-indigo-200 text-indigo-600 '
          : ''
      }
      inline-flex items-center px-3 py-2 border shadow-sm text-base font-medium rounded-md text-gray-500  focus:outline-none 
     
      `}
      >
        Header Type 2
      </button>
      <button
        value="headerTypeThree"
        data-headertype="headerTypeThree"
        onClick={onButtonClick}
        type="button"
        className={`
      ${
        state && state.headerType === 'headerTypeThree'
          ? 'bg-indigo-200 text-indigo-600 '
          : ''
      }
      inline-flex items-center px-3 py-2 border shadow-sm text-base font-medium rounded-md text-gray-500  focus:outline-none 
     
      `}
      >
        Header Type 3
      </button>
      <button
        value="headerTypeFour"
        data-headertype="headerTypeFour"
        onClick={onButtonClick}
        type="button"
        className={`
      ${
        state && state.headerType === 'headerTypeFour'
          ? 'bg-indigo-200 text-indigo-600 '
          : ''
      }
      inline-flex items-center px-3 py-2 border shadow-sm text-base font-medium rounded-md text-gray-500  focus:outline-none 
     
      `}
      >
        Header Type 4
      </button>
    </div>
  );
}
