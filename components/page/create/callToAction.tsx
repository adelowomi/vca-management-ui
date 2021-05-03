import * as React from 'react';

export interface CallToActionProps {
  actionText: string;
  ctaLink: string;
  hasAction: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setHasAction: (hasAction: boolean) => void;
}

export function CallToAction({
  actionText,
  ctaLink,
  handleChange,
  setHasAction,
  hasAction,
}: CallToActionProps) {
  return (
    <div className="inputSection2 mt-1 grid grid-cols-7">
      <div className=" col-span-3">
        <label className="text-gray-700 font-medium">
          Call To Actions Button
        </label>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => setHasAction(!hasAction)}
            type="button"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-400 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {hasAction ? 'Active' : 'Inactive'}
          </button>
          <input
            style={{ background: '#F2F2F2', color: '#A3A3A3' }}
            name="actionText"
            value={actionText}
            onChange={handleChange}
            type="text"
            placeholder="Action Text"
            className="inline-flex font-light items-center  pl-3  border border-gray-300 shadow-sm text-sm italic rounded-md text-gray-500  focus:outline-none focus:border-indigo-500"
          />
        </div>
        <input
          style={{ background: '#F2F2F2', color: '#A3A3A3' }}
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
