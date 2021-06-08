import React from 'react';
import styled from 'styled-components';

import mergeClassNames from '../../helpers/mergeClassNames';
import theme from '../../styles/theme';

export const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 'fit-content';
  padding: 8px 0px;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-family: 'Avenir Next';
  font-weight: 500;
  color: ${theme.colors.greyishBrown};
`;

export type InputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'url';

export interface InputProp {
  /**
   * Add some additional styles
   */
  className?: string;
  /**
   * Boolean of whether to make the input disabled
   */
  disabled?: boolean;
  /**
   * Displays error text if available
   */
  errorDescription?: string;
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder?: string;
  /**
   * It prevents the user from changing the value of the field.
   */
  readOnly?: boolean;
  /**
   * it specifies that an input field must be filled out
   */
  required?: boolean;
  /**
   * inputType
   * The HTML type of the input field
   * text, password, email, phone, etc.
   */
  type?: InputTypes;
  inputRef?: React.RefObject<HTMLInputElement>;
  /**
   * Determines label of input field
   */
  label?: string;
  /**
   * Defines the maximum number of characters the user can enter into the `input`.
   */
  maxLength?: number;
  /**
   *  name attribute specifies the name of the input element
   */
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProp> = ({
  className,
  disabled,
  errorDescription,
  placeholder,
  readOnly,
  required,
  type,
  inputRef,
  label,
  maxLength,
  name,
  onChange,
  ...rest
}) => {
  const disabledClassName = disabled && 'app-disabled';
  const inputStyle = errorDescription
    ? 'shadow-sm focus:ring-red-500 focus:border-red-500 focus:border-2 block w-96 h-14 sm:text-sm border border-red-500 rounded-sm pl-4'
    : 'shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:border-2 block w-96 h-14 sm:text-sm border border-gray-400 rounded-sm pl-4';
  return (
    <div className="flex flex-col px-0">
      <label htmlFor={name} className="mb-6 text-xl font-medium " id={label}>
        {label}
      </label>
      <input
        className={mergeClassNames(disabledClassName, className, inputStyle)}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={maxLength}
        ref={inputRef}
        required={required}
        onChange={onChange}
        data-testid="input-test"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      {errorDescription && (
        <p className="pt-2 text-sm app-red">{errorDescription}</p>
      )}
    </div>
  );
};

const noOp = () => undefined;

Input.defaultProps = {
  className: '',
  disabled: false,
  label: '',
  errorDescription: '',
  placeholder: '',
  readOnly: false,
  required: false,
  type: 'text',
  maxLength: null,
  name: '',
  onChange: noOp,
};

export default Input;
