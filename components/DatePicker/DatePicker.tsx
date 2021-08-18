import { DatePicker } from 'baseui/datepicker';
import * as React from 'react';

export const BaseDatePicker = ({
  dateValue,
  setDate,
  name,
  id,
}: {
  dateValue: any;
  setDate: any;
  name: string;
  id?: string;
}) => {
  // const [value, setValue] = React.useState([
  //   new Date(),
  //   new Date('2021 may, 10'),
  // ]);

  const d = new Date(dateValue);
  const isDate =
    d instanceof Date && !isNaN(d as any) ? new Date(dateValue) : new Date();

  return (
    <DatePicker
      value={isDate}
      onChange={({ date }) => {
        setDate(date, name, id);
        // return setValue(Array.isArray(date) ? date : [date]);
      }}
      overrides={{
        InputWrapper: {
          style: () => ({
            border: `.01px grey solid`,
            borderRadius: '2px',
          }),
        },
        Input: {
          props: {
            overrides: {
              Input: {
                style: () => {
                  return {
                    backgroundColor: '#fff',
                    paddingTop: '15px',
                    paddingBottom: '15px',
                  };
                },
              },
            },
          },
        },
      }}
    />
  );
};
