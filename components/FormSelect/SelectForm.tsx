import { Listbox } from '@headlessui/react';
import { useState } from 'react';

import { ChevronDown } from '../AssetsSVG';

interface Item {
  id?: number;
  name?: string;
  value?: string;
  unavailable?: boolean;
}

interface FormSelectProps {
  error?: any;
  onChange(item: Item): void;
  errorText?: string;
  options: any;
  defaultOption?: any;
}

const FormSelect: React.FunctionComponent<FormSelectProps> = ({
  error,
  onChange,
  errorText,
  options,
  defaultOption,
}) => {
  const inputStyle =
    'text-left text-base text-gray-700 font-semibold  h-14 shadow-sm block  sm:text-sm border border-gray-400 rounded-sm w-full py-3 mt-2';
  const [selectedPerson, setSelectedPerson] = useState(defaultOption);

  return (
    <div>
      <Listbox
        value={selectedPerson}
        onChange={(data) => {
          setSelectedPerson(data);
          onChange(data);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className={inputStyle}>
            <div className="flex flex-row items-center my justify-between px-3">
              <div className="text-base">{selectedPerson.name}</div>
              <div className="flex flex-row items-center  space-x-2">
                <div className="bg-gray-300 h-6" style={{ width: 2 }} />
                <div className="ml- mr- mt-1">{ChevronDown}</div>
              </div>
            </div>
          </Listbox.Button>
          <Listbox.Options className="absolute w-full pt-2 border-vca-blue border-t-2 z-50 bg-white overflow-auto shadow-lg">
            {options.map((person) => (
              <Listbox.Option
                key={person.id}
                value={person}
                disabled={person.unavailable}
                className="h-12 bg-white pl-4 text-base flex flex-row items-center hover:font-bold hover:bg-blue-100 hover:text-blue-400"
              >
                {person.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      <p className=" text-vca-red mt-2">
        {error?.type === 'required' && errorText}
      </p>
    </div>
  );
};

export default FormSelect;
