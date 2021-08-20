import { Listbox } from '@headlessui/react';
import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';

export default function ColorPicker({
  color,
  setColor,
}: {
  color: string;
  setColor: any;
}): JSX.Element {
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <Listbox value={color} onChange={setColor}>
      <div className="relative">
        <Listbox.Button
          className={
            'text-left text-base text-gray-700 font-semibold  h-14 shadow-sm block  sm:text-sm border border-gray-500 rounded-sm w-full py mt px-2'
          }
        >
          <div className="flex flex-row items-center justify-between">
            <div onClick={() => setPickerOpen(!pickerOpen)}>
              <span className="text-xs text-gray-500 font-normal">
                Select Color
              </span>
              <div className="text-base">{color?.toUpperCase()}</div>
            </div>

            <div
              className="  w-10 h-10 rounded-sm"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </Listbox.Button>
        {pickerOpen ? (
          <div className="absolute z-10">
            <TwitterPicker onChange={(color) => setColor(color.hex)} />
          </div>
        ) : null}
      </div>
    </Listbox>
  );
}
