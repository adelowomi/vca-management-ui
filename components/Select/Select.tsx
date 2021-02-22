import React, { useCallback } from 'react';

import mergeClassNames from '../../helpers/mergeClassNames';
import { ChevronDown, ChevronUp } from '../AssetsSVG';

interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  /**
   * Add some additional styles
   */
  className?: string;
  /**
   * Boolean of whether to make the input disabled
   */
  disabled?: boolean;
  /**
   * Determines label of select field
   */
  label: string;
  /**
   * Add some additional styles to the list
   */
  listClassName?: string;
  /**
   * specifies a short hint that describes the expected value
   * in the select field
   */
  placeholder: string;
  /**
   * List of items to display in the dropdown
   */
  options: Option[];
  /**
   * Callback for the consuming application
   */
  onSelect: Function;
}

const Select: React.FC<SelectProps> = ({
  className,
  disabled,
  label,
  placeholder,
  listClassName,
  options,
  onSelect,
}) => {
  const [show, setShow] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const toggleOpen = useCallback(() => {
    if (!disabled) setShow((val) => !val);
  }, [disabled]);

  const selectThis = useCallback(
    (option: Option) => (event: React.MouseEvent | React.KeyboardEvent) => {
      event.stopPropagation();
      onSelect(option.label);
      setSelectedValue(option.label);
      setShow(false);
    },
    [onSelect, setShow, setSelectedValue]
  );

  const handleClickOutside = () => {
    setShow(false);
  };

  const renderListItems = (items: Option[]) =>
    items.map((item, index) => {
      return (
        <li
          id={`${item.value}`}
          key={index}
          role="option"
          onKeyPress={selectThis(item)}
          onClick={selectThis(item)}
          data-testid={'selectList'}
        >
          {item.label}
        </li>
      );
    });
  const listStyle = show ? { display: 'block' } : { display: 'none' };
  const disabledClassName = disabled && 'app-select-disabled';

  return (
    <div className="flex flex-col w-full py-2 px-0">
      <label className="mb-2 font-medium app-greyish-brown">{label}</label>
      <div
        className={mergeClassNames(
          'relative inline-block',
          disabledClassName,
          className
        )}
        onClick={toggleOpen}
        onBlur={handleClickOutside}
        onKeyPress={toggleOpen}
        tabIndex={0}
        role="button"
        data-testid="select-container-test"
      >
        <div className={`app-form-select ${disabledClassName}`}>
          <div className="py-4">
            {selectedValue ? selectedValue : placeholder}
          </div>
        </div>
        <div className="absolute top-4 right-2 cursor-pointer">
          {show ? ChevronUp : ChevronDown}
        </div>
        <ul
          className={mergeClassNames('app-form-select-list', listClassName)}
          style={listStyle}
          role="listbox"
          data-testid="select-list-test"
        >
          {renderListItems(options)}
        </ul>
      </div>
    </div>
  );
};

const noOp = () => undefined;

Select.defaultProps = {
  className: '',
  disabled: false,
  label: '',
  placeholder: '',
  listClassName: '',
  options: [],
  onSelect: noOp,
};

export default Select;
