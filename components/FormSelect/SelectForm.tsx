import { Listbox } from '@headlessui/react';
import { useState } from 'react';

import { ChevronDown } from '../AssetsSVG';

interface Item {
  id?: number;
  name?: string;
  value?: string;
  unavailable?: boolean;
}
// enum types = {
//   font
// }
interface FormSelectProps {
  error?: any;
  onChange(item: Item): void;
  errorText?: string;
  options: any;
  defaultOption?: any;
  name?: any;
  type: string;
}

const FormSelect: React.FunctionComponent<FormSelectProps> = ({
  error,
  onChange,
  errorText,
  options,
  defaultOption,
  name,
  type,
}) => {
  const inputStyle =
    'text-left text-base text-gray-700 font-semibold  h-14 shadow-sm block  sm:text-sm border border-gray-500 rounded-sm w-full py mt px-2';
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
        <div className="relative">
          <Listbox.Button className={inputStyle}>
            <div className="flex flex-row items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 font-normal">
                  {name}
                </span>
                <div className="text-base">{selectedPerson.name}</div>
              </div>
              {type === 'font' ? (
                <div className="flex flex-row items-center  space-x-2 ">
                  <div className="bg-gray-400  h-6" style={{ width: 2 }} />
                  <div className="ml- mr- mt-1">{ChevronDown}</div>
                </div>
              ) : (
                <div className=" bg-vca-blue w-10 h-10 rounded-sm"></div>
              )}
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
