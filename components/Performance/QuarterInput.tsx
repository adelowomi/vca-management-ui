import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { BaseDatePicker } from '../DatePicker/DatePicker';
import { Input } from '../Page/PageInput';
import { Grid, H2, ImageSelectBox } from '../Page/PageStyledElements';
import ItemCard from '../utilsGroup/ItemCard';
import { SelectItemsModal } from '../utilsGroup/SelectItemsModal';

const QuarterInput = ({
  name,
  description,
  start,
  stop,
  handleRemoveFields,
  id,
  handleChangeInput,
  setDate,
  items,
  state,
  getQuarterItems,
  handleSetItems,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className=" py-6 mt-10 -ml-9 mr-12 px-9">
      <SelectItemsModal
        open={open}
        setOpen={setOpen}
        getItems={getQuarterItems}
        state={state}
        items={items}
        handleSubmit={() => {
          setOpen(!open);
          handleSetItems(id);
        }}
      />
      <H2 className="mt-5 mb-10">{name}</H2>
      <Grid className="space-x-5 mt-5">
        <div className="w-full mt-">
          <H2 className="mb-5">Name</H2>
          <Input
            className="py-4 w-96 "
            placeholder="Name"
            onChange={(event) => handleChangeInput(id, event)}
            name="name"
            value={name}
          />
          {/* {errors && errors.actionText && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.actionText}
              </span>
            )} */}
        </div>
        <div className="w-full mt-">
          <H2 className="mb-5">Description</H2>
          <Input
            className="py-4 w-96 "
            placeholder="lorem ipsum"
            onChange={(event) => handleChangeInput(id, event)}
            name="description"
            value={description}
          />
          {/* {errors && errors.actionText && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.actionText}
              </span>
            )} */}
        </div>

        <div
          className="flex flex-row cursor-pointer"
          onClick={() => handleRemoveFields(id)}
        >
          <span className="flex space-x-2 mr-20">
            <h3 className="font-bold">Delete</h3>

            <RiDeleteBin6Line className="h-6 w-6" />
          </span>
        </div>
      </Grid>
      <Grid className="space-x-5 mt-5">
        <div className="w- mt- w-96">
          <H2 className="mb-5">Start date</H2>
          <BaseDatePicker
            name="start"
            dateValue={start ? new Date() : new Date()}
            setDate={setDate}
            id={id}
          />

          {/* {errors && errors.actionText && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.actionText}
              </span>
            )} */}
        </div>
        <div className="w- mt- w-96">
          <H2 className="mb-5">Stop date</H2>
          <BaseDatePicker
            name="stop"
            dateValue={stop ? new Date() : new Date()}
            setDate={setDate}
            id={id}
          />

          {/* {errors && errors.actionText && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.actionText}
              </span>
            )} */}
        </div>
      </Grid>
      <ImageSelectBox
        className="mt-6 mb-6 w-96 flex items-center justify-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p>+ Select posts</p>
      </ImageSelectBox>
      <div className="grid grid-cols-3 gap-4">
        {state.map((el: any) => {
          return (
            <ItemCard
              key={el.id || el}
              id={el.id}
              media={el.mediaUrl}
              featured={el.featured}
              description={el.description}
              createdAt={el.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuarterInput;
