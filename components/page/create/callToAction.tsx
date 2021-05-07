import * as React from 'react';

import ToggleButton from '../../ToggleButton/ToggleButton';

export interface CallToActionProps {
  actionText: string;
  ctaLink: string;
  // hasAction: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // setHasAction: (hasAction: boolean) => void;
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

export function CallToAction({
  actionText,
  ctaLink,
  handleChange,
  toggle,
  setToggle,
}: CallToActionProps) {
  return (
    <div className="inputSection2 mt-1 grid grid-cols-7">
      <div className=" col-span-3">
        <label className="text-gray-700 font-medium">
          Call To Actions Button
        </label>
        <div className="flex space-x-2 mt-2 items-center justify-self-center">
          <ToggleButton enabled={toggle} setEnabled={setToggle} />

          <input
            name="actionText"
            value={actionText}
            onChange={handleChange}
            type="text"
            placeholder="Action Text"
            className="inline-flex font-light items-center  pl-3 py-3 border border-gray-300 shadow-sm text-sm italic rounded-md text-gray-500  focus:outline-none focus:border-indigo-500"
          />
        </div>
        <input
          name="ctaLink"
          value={ctaLink}
          onChange={handleChange}
          type="text"
          placeholder="CTA (call to action)link"
          className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg italic text-gray-700 focus:outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
}
