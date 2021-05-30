import { Listbox } from '@headlessui/react';
import { useState } from 'react';

import { ChevronDown } from '../AssetsSVG';

const options = [
  { id: 1, name: 'Image', unavailable: false },
  { id: 2, name: 'Video', unavailable: false },
  { id: 3, name: 'Document', unavailable: false },
];

interface Item {
  id: number;
  name: string;
  unavailable: boolean;
}

interface FormSelectProps {
  items?: Item[];
  label: string;
  error: any;
  onChange(item: Item): void;
  errorText: string;
}

const FormSelect: React.FunctionComponent<FormSelectProps> = ({
  label,
  error,
  onChange,
  errorText,
}) => {
  const inputStyle =
    error?.type === 'required'
      ? 'text-left text-base text-gray-700 font-semibold w-96 h-14 mt-6 shadow-sm block w-96 h-14 sm:text-sm border border-red-500 rounded-sm pl-4'
      : 'text-left text-base text-gray-700 font-semibold w-96 h-14 mt-6 shadow-sm block w-96 h-14 sm:text-sm border border-gray-400 rounded-sm pl-4';
  const [selectedPerson, setSelectedPerson] = useState(options[0]);

  return (
    <div>
      <label className="block text-xl text-gray-700 font-semibold">
        {label}
      </label>
      <Listbox
        value={selectedPerson}
        onChange={(data) => {
          setSelectedPerson(data);
          onChange(data);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className={inputStyle}>
            <div className="flex flex-row items-center justify-between ">
              <div>
                <div>{selectedPerson.name}</div>
              </div>
              <div className="flex flex-row items-center">
                <div className="bg-gray-300 h-6" style={{ width: 2 }} />
                <div className="ml-4 mr-4 mt-1">{ChevronDown}</div>
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
