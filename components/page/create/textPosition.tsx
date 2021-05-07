import * as React from 'react';

export interface TextpositionProps {
  locationButtonClick: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  textPosition: string;
}

export function Textposition({
  locationButtonClick,
  textPosition,
}: TextpositionProps) {
  return (
    <div className="inputSection3 mt-1 ">
      <div className="">
        <label className="text-gray-700 font-medium">Text Position</label>
        <div className="flex space-x-3 mt-2 text-gray-500">
          <a
            href="#"
            onClick={locationButtonClick}
            className={`
            ${
              textPosition === 'left'
                ? 'border-b border-blue-800 text-blue-800'
                : ''
            }

            focus:border-b-2 focus:text-blue-800  text-sm cursor-pointer `}
          >
            Left
          </a>
          <a
            href="#"
            onClick={locationButtonClick}
            className={`
            ${
              textPosition === 'right'
                ? 'border-b border-blue-800 text-blue-800'
                : ''
            }

            focus:border-b-2 focus:text-blue-800  text-sm cursor-pointer `}
          >
            Right
          </a>
          <a
            href="#"
            onClick={locationButtonClick}
            className={`
            ${
              textPosition === 'bottom'
                ? 'border-b border-blue-800 text-blue-800'
                : ''
            }

            focus:border-b-2 focus:text-blue-800  text-sm cursor-pointer `}
          >
            Bottom
          </a>
        </div>
      </div>
    </div>
  );
}
