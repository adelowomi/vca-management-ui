import * as React from 'react';

export interface TextpositionProps {
  locationButtonClick: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
}

export function Textposition({ locationButtonClick }: TextpositionProps) {
  return (
    <div className="inputSection3 mt-1 ">
      <div className="">
        <label className="text-gray-700 font-medium">Text Position</label>
        <div className="flex space-x-3 mt-2 text-gray-500">
          <a
            href="#"
            onClick={locationButtonClick}
            className="focus:border-b-2 focus:border-blue-800 focus:text-blue-800  text-sm cursor-pointer "
          >
            Left
          </a>
          <a
            href="#"
            onClick={locationButtonClick}
            className="text-sm focus:text-blue-800 cursor-pointer "
          >
            Right
          </a>
          <a
            href="#"
            onClick={locationButtonClick}
            className="text-sm cursor-pointer focus:text-blue-800"
          >
            Bottom
          </a>
        </div>
      </div>
    </div>
  );
}
