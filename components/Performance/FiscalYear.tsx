import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BaseDatePicker } from '../DatePicker/DatePicker';
import { ShadowBtn } from '../Page/PageButtons';
import { Input } from '../Page/PageInput';
import { Grid, H1, H2, ImageSelectBox } from '../Page/PageStyledElements';
import QuarterInput from './QuarterInput';

interface QuarterProps {
  id: string;
  name: string;
  description: string;
  startDate: string;
  stopDate: string;
  items: QuarterProps[];
}

export const FiscalYear = ({
  state,
  handleChange,
  setDate,
  getQuarters,
  errors,
}) => {
  const [quarters, setQuarters] = React.useState<QuarterProps[]>([]);

  const [input, setInputValues] = React.useState({
    id: uuidv4(),
    name: '',
    description: '',
    startDate: '',
    stopDate: '',
    items: [],
  });
  // console.log('INPUTS', input);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...input,
      [name]: value,
    });
  };

  const handleAddFields = (e) => {
    e.preventDefault();
    setQuarters([...quarters, { ...input }]);
    setInputValues({
      id: '',
      name: '',
      description: '',
      startDate: '',
      stopDate: '',
      items: [],
    });
  };

  const handleRemoveFields = (id) => {
    const values = [...quarters];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setQuarters(values);
  };
  // console.log('STATE', state);

  const setInputDate = (date, name: string) => {
    setInputValues({
      ...input,
      [name]: date?.toISOString(),
    });
  };
  React.useEffect(() => {
    getQuarters(quarters);
  }, [quarters]);
  return (
    <div>
      <div>
        <H1 className="mt-6">2. Fiscal year</H1>
      </div>
      <div className="w-96">
        <H2 className="mb-5 mt-8">Select fiscal year</H2>
        <BaseDatePicker dateValue={state.year} setDate={setDate} name="year" />
        {errors && errors.year && (
          <span className="text-red-500 mt-1 text-sm font-medium">
            {errors.year}
          </span>
        )}
      </div>
      <Grid className="space-x-5 mt-5">
        <div className="w-full mt-">
          <H2 className="mb-5">Name</H2>
          <Input
            className="py-4 w-96 "
            placeholder="Name"
            onChange={handleChange}
            name="name"
            value={state.name}
          />
          {errors && errors.name && (
            <span className="text-red-500 mt-1 text-sm font-medium">
              {errors.name}
            </span>
          )}
        </div>

        <div className="w-full mt-">
          <H2 className="mb-5">Description</H2>
          <Input
            className="py-4 w-96 "
            placeholder="lorem ipsum"
            onChange={handleChange}
            name="description"
            value={state.description}
          />
          {errors && errors.description && (
            <span className="text-red-500 mt-1 text-sm font-medium">
              {errors.description}
            </span>
          )}
        </div>
      </Grid>
      <Grid className="space-x-5 mt-5">
        <div className="w-96 mt-">
          <H2 className="mb-5">Start date</H2>

          <BaseDatePicker
            dateValue={state.startDate}
            setDate={setDate}
            name="startDate"
          />
          {errors && errors.startDate && (
            <span className="text-red-500 mt-1 text-sm font-medium">
              {errors.startDate}
            </span>
          )}
        </div>

        <div className="w- mt- w-96">
          <H2 className="mb-5">Stop date</H2>

          <BaseDatePicker
            dateValue={state.stopDate}
            setDate={setDate}
            name="stopDate"
          />
          {errors && errors.stopDate && (
            <span className="text-red-500 mt-1 text-sm font-medium">
              {errors.stopDate}
            </span>
          )}
        </div>
      </Grid>
      <hr className="border-gray-400 border-5 w-full mt-8" />
      {quarters.map((qrt) => {
        return (
          <QuarterInput
            id={qrt.id}
            key={qrt.id}
            name={qrt.name}
            description={qrt.description}
            startDate={qrt.startDate}
            stopDate={qrt.stopDate}
            handleRemoveFields={handleRemoveFields}
          />
        );
      })}{' '}
      <div className="border border-black py-6 mt-10 -ml-9 mr-12 px-9">
        <H2 className="mt-5 mb-10">Add a new quarter</H2>
        <Grid className="space-x-5 mt-5">
          <div className="w-full mt-">
            <H2>Name</H2>
            <Input
              className="py-4 w-96 "
              placeholder="Name"
              onChange={onChange}
              name="name"
              value={input.name}
            />
          </div>

          <div className="w-full mt-">
            <H2>Description</H2>
            <Input
              className="py-4 w-96 "
              placeholder="lorem ipsum"
              onChange={onChange}
              name="description"
              value={input.description}
            />
          </div>
        </Grid>
        <Grid className="space-x-5 mt-5">
          <div className="w- mt- w-96">
            <H2 className="mb-5">Start date</H2>
            <BaseDatePicker dateValue setDate={setInputDate} name="startDate" />
          </div>
          <div className="w- mt- w-96">
            <H2 className="mb-5">Stop date</H2>

            <BaseDatePicker dateValue setDate={setInputDate} name="stopDate" />
          </div>
        </Grid>
        <ImageSelectBox
          className="mt-6 mb-6 w-96 flex items-center justify-center cursor-pointer"
          //   onClick={() => setOpen(!open)}
        >
          <p>+ Select posts</p>
        </ImageSelectBox>
        <ShadowBtn
          bg="primary"
          className="py-4 px-10 shadow-sm  rounded text-sm font-bold"
          onClick={handleAddFields}
        >
          Add quarter
        </ShadowBtn>
      </div>
      {/* </div> */}
    </div>
  );
};
