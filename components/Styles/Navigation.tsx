import React from 'react';

import SelectForm from '../FormSelect/SelectForm';

const options = [
  {
    id: 'ugygygygygygyg',
    name: '#fff546',
    value: 'yes',
    unavailable: false,
  },
  {
    id: 'ugygygygygygyi',
    name: '#0000',
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
const defaultColor = {
  id: 'ugygygygygygye',
  name: '#213987',
  value: '',
  unavailable: true,
};
export const NavigationStyles = ({ onChange }) => {
  return (
    <section className="mt-10">
      <h4 className="text-lg font-semibold mb">Navigation</h4>
      <hr className="border-gray-400 border-5 w-full mt-2" />

      <div className="grid grid-cols-10 gap-6 items-center content-center mt-6">
        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Background color</h4>
          <SelectForm
            options={options}
            defaultOption={defaultOption}
            onChange={onChange}
            name="select font"
            type="color"
          />
        </div>

        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Font color</h4>
          <SelectForm
            options={options}
            defaultOption={defaultColor}
            onChange={onChange}
            name="select color"
            type="color"
          />
        </div>
      </div>
      <div className="grid grid-cols-10 gap-6 items-center content-center mt-6">
        <div className="col-span-4">
          <h4 className="text-xl font-semibold mb-4">Accent color</h4>
          <SelectForm
            options={options}
            defaultOption={defaultColor}
            onChange={onChange}
            name="select color"
            type="color"
          />
        </div>
      </div>
    </section>
  );
};
