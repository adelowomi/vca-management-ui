import React from 'react';
import CreatableSelect from 'react-select/creatable';

const OPTS = [
  { value: 'finance', label: 'finance' },
  { value: 'money', label: 'money' },
  { value: 'religion', label: 'religion' },
];
const customStyles = {
  option: (provided) => ({
    ...provided,
  }),
  control: (provided) => ({
    ...provided,
    minHeight: '56px',
    height: '100%',
    outline: 'none',
    width: '100%',
    border: '1px solid rgba(75, 85, 99, 0.45)',
    borderRadius: 'none',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export const TagSelector = ({
  getTags,
  defaultValue,
}: {
  defaultValue?: any;
  getTags: (newValue: any) => void;
}) => {
  const handleChange = (newValue: any) => {
    getTags(newValue);
  };
  const defaultTags = defaultValue
    ? defaultValue.map((el) => {
        return { value: el, label: el };
      })
    : [];

  return (
    <CreatableSelect
      defaultValue={defaultValue ? defaultTags : []}
      styles={customStyles}
      isMulti
      onChange={handleChange}
      options={OPTS}
    />
  );
};
