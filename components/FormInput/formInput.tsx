import { FieldValues, UseFormRegister } from 'react-hook-form';

interface FormInputProps {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues> ;
  error: any;
  required?: boolean;
  disableLabel?: boolean;
  validate?: any;
}

export const FormInput = ({
  label,
  name,
  register,
  error = null,
  required = false,
  disableLabel = false,
  validate = {},
}: FormInputProps): JSX.Element => {
  const inputStyle =
    error
      ? 'shadow-sm focus:ring-red-500 focus:border-red-500 focus:border-2 block w-96 h-14 sm:text-sm border border-red-500 rounded-sm pl-4'
      : 'shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:border-2 block w-96 h-14 sm:text-sm border border-gray-400 rounded-sm pl-4';
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
      <div className={disableLabel ? '' : 'mt-6'}>
        <input
          {...register(`${name}`, { required, ...validate })}
          className={inputStyle}
          placeholder={`${label}`}
          aria-describedby={`${name}`}
        />
      </div>
      <p className=" text-vca-red mt-2">
        {error?.type === 'required' && `${name} is required` || error?.message}
      </p>
    </div>
  );
};
