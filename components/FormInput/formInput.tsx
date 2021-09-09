import { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface FormInputProps {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  error: any;
  type?: string;
  required?: boolean;
  disableLabel?: boolean;
  validate?: any;
  icon?: boolean;
}

export const FormInput = ({
  label,
  name,
  register,
  type = 'text',
  icon = false,
  error = null,
  required = false,
  disableLabel = false,
  validate = {},
}: FormInputProps): JSX.Element => {
  const inputStyle = error
    ? 'shadow-sm focus:ring-red-500 focus:border-red-500 focus:border-2 block w-96 h-14 sm:text-sm border border-red-500 rounded-sm pl-4'
    : 'shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:border-2 block w-96 h-14 sm:text-sm border border-gray-400 rounded-sm pl-4';

  const [passwordReveal, setPasswordReveal] = useState(false);
  return (
    <div>
      <label
        htmlFor={`${name}`}
        className={`lock text-xl text-gray-700 font-semibold ${
          disableLabel ? 'hidden' : ''
        }`}
      >
        {label}
      </label>
      <div className={`relative ${disableLabel ? '' : 'mt-6'}`}>
        <input
          {...register(`${name}`, { required, ...validate })}
          className={inputStyle}
          placeholder={`${label}`}
          type={`${passwordReveal ? 'text' : type}`}
          aria-describedby={`${name}`}
        />
        {icon && (
          <span
            className="absolute right-5 inset-y-5 cursor-pointer"
            onClick={() => setPasswordReveal(!passwordReveal)}
          >
            {passwordReveal ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        )}
      </div>
      <p className=" text-vca-red mt-2">
        {(error?.type === 'required' && `${name} is required`) ||
          error?.message}
      </p>
    </div>
  );
};
