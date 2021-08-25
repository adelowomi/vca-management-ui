import { Listbox } from '@headlessui/react';
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import rgb2Hex from "rgb2hex";

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
            <ChromePicker color={color} onChange={(c) => {setColor(rgb2Hex(`rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`).hex)}} />
          </div>
        ) : null}
      </div>
    </Listbox>
  );
}
