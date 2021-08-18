import React from 'react';

import { BorderMd, BorderNone, BorderRounded } from '../AssetsSVG';
import SelectForm from '../FormSelect/SelectForm';

const options2 = [
  {
    id: 'ugygygygygygyg',
    name: 'Fira mono',
    value: 'yes',
    unavailable: false,
  },
  {
    id: 'ugygygygygygyi',
    name: 'Inter',
    value: 'false',
    unavailable: false,
  },
];

const defaultOption = {
  id: 'ugygygygygygye',
  name: 'Open Sans',
  value: '',
  unavailable: true,
};

export const ButtonStyles = ({ onChange }) => {
  return (
    <section className="mt-10">
      <h4 className="text-lg font-semibold mb">Buttons</h4>
      <hr className="border-gray-400 border-5 w-full mt-2" />

      <div className="grid grid-cols-10 gap-6 items-center content-center mt-6">
        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Fonts</h4>
          <SelectForm
            options={options2}
            defaultOption={defaultOption}
            onChange={onChange}
            name="select font"
            type="color"
          />
        </div>

        <div className="col-span-6">
          <div className="grid grid-cols-12 gap-8 items-center content-center">
            <div className="col-span-6">
              <h4 className="text-xl font-semibold mb-4">
                Button border style
              </h4>
              <div className="grid grid-cols-3 gap-5 items-center content-center">
                <div className="h-14 w-16 bg-vca-grey-6 flex justify-center items-center">
                  <BorderNone />
                </div>
                <div
                  className="h-14 w-16  border-vca-blue border-2 flex justify-center items-center"
                  style={{ background: ' rgba(24, 144, 255, 0.1)' }}
                >
                  <BorderMd />
                </div>
                <div className="h-14 w-16 bg-vca-grey-6 flex justify-center items-center">
                  <BorderRounded />
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <h4 className="text-xl font-semibold mb-4">Preview button</h4>
              <button className="h-14 bg-vca-blue text-white text-lg font-bold rounded-md px-8">
                Read all news
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
