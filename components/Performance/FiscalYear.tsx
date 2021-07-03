import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BaseDatePicker } from '../DatePicker/DatePicker';
import { ShadowBtn } from '../Page/PageButtons';
import { Input } from '../Page/PageInput';
import { Grid, H1, H2, ImageSelectBox } from '../Page/PageStyledElements';
import { SelectItemsModal } from '../utilsGroup/SelectItemsModal';
import QuarterInput from './QuarterInput';

interface QuarterProps {
  id: string;
  name: string;
  description: string;
  start: Date;
  stop: Date;
  items: string[];
  mediaUrl?: string;
}

interface FiscalYearProps {
  state: any;
  handleChange: any;
  setDate: any;
  getQuarters: any;
  errors: any;
  items?: any;
}
export const FiscalYear: React.FC<FiscalYearProps> = ({
  state,
  handleChange,
  setDate,
  getQuarters,
  errors,
  items,
}) => {
  const existingQuarters = state?.quarters;

  const [quarters, setQuarters] = React.useState<QuarterProps[]>([
    ...existingQuarters,
  ]);

  const [isSelected, setIsSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const [input, setInputValues] = React.useState({
    id: uuidv4(),
    name: '',
    description: '',
    start: new Date(),
    stop: new Date(),
    items: [],
  });

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
      id: uuidv4(),
      name: '',
      description: '',
      start: new Date(),
      stop: new Date(),
      items: [],
    });
  };

  const handleRemoveFields = (id: string) => {
    const values = [...quarters];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setQuarters(values);
  };

  const setInputDate = (date: any, name: string, id = undefined) => {
    if (id) {
      const newInputFields = quarters.map((field) => {
        if (id === field.id) {
          field[name] = date?.toISOString();
        }
        return field;
      });

      setQuarters(newInputFields);
    } else {
      setInputValues({
        ...input,
        [name]: date?.toISOString(),
      });
    }
  };

  const handleChangeInput = (
    id: string,
    { currentTarget: { name, value } }: React.FormEvent<HTMLInputElement>
  ) => {
    const newInputFields = quarters.map((field) => {
      if (id === field.id) {
        field[name] = value;
      }
      return field;
    });

    setQuarters(newInputFields);
  };

  const getItems = (selected: string[]) => {
    setInputValues({
      ...input,
      items: [...selected],
    });
  };

  const getQuarterItems = (selected) => {
    setIsSelected(selected);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleSetItems = (id) => {
    const updatedQuarter = quarters.filter((field) => field.id === id)[0];
    updatedQuarter.items = isSelected;
    const allQuarters = quarters.filter((field) => field.id !== id);
    setQuarters([...allQuarters, updatedQuarter]);
  };

  React.useEffect(() => {
    getQuarters(quarters);
  }, [quarters]);

  return (
    <div>
      <SelectItemsModal
        open={open}
        setOpen={setOpen}
        getItems={getItems}
        state={[...input.items]}
        items={items}
        handleSubmit={handleSubmit}
      />
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
            dateValue={state.start}
            setDate={setDate}
            name="start"
          />
          {errors && errors.start && (
            <span className="text-red-500 mt-1 text-sm font-medium">
              {errors.start}
            </span>
          )}
        </div>

        <div className="w- mt- w-96">
          <H2 className="mb-5">Stop date</H2>

          <BaseDatePicker
            dateValue={state.stop}
            setDate={setDate}
            name="stop"
          />
          {errors && errors.stop && (
            <span className="text-red-500 mt-1 text-sm font-medium">
              {errors.stop}
            </span>
          )}
        </div>
      </Grid>
      <hr className="border-gray-400 border-5 w-full mt-8" />
      {quarters.map((qrt) => {
        return (
          <QuarterInput
            key={qrt.id}
            id={qrt.id}
            name={qrt.name}
            description={qrt.description}
            start={qrt.start}
            stop={qrt.stop}
            handleRemoveFields={handleRemoveFields}
            handleChangeInput={handleChangeInput}
            setDate={setInputDate}
            state={qrt.items}
            items={items}
            getQuarterItems={getQuarterItems}
            handleSetItems={handleSetItems}
          />
        );
      })}
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
            <BaseDatePicker
              dateValue={input.start}
              setDate={setInputDate}
              name="start"
            />
          </div>
          <div className="w- mt- w-96">
            <H2 className="mb-5">Stop date</H2>

            <BaseDatePicker
              dateValue={input.stop}
              setDate={setInputDate}
              name="stop"
            />
          </div>
        </Grid>
        <ImageSelectBox
          className="mt-6 mb-6 w-96 flex items-center justify-center cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <p>+ Select posts</p>
        </ImageSelectBox>
        <ShadowBtn
          bg="primary"
          className="py-4 px-10 mt-5 shadow-sm  rounded text-sm font-bold"
          onClick={handleAddFields}
        >
          Add quarter
        </ShadowBtn>
      </div>
    </div>
  );
};
