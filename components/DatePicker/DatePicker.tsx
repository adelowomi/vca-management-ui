import { DatePicker } from 'baseui/datepicker';
import * as React from 'react';

export const BaseDatePicker = ({ dateValue, setDate, name }) => {
  // const [value, setValue] = React.useState([
  //   new Date(),
  //   new Date('2021 may, 10'),
  // ]);
  return (
    <DatePicker
      value={dateValue ? new Date(dateValue) : new Date()}
      onChange={({ date }) => {
        setDate(date, name);
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
