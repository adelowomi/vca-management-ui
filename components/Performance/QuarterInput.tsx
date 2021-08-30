import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { BaseDatePicker } from '../DatePicker/DatePicker';
import { ItemsModal } from '../Page/ItemsModal';
import { Input } from '../Page/PageInput';
import { Grid, H2, ImageSelectBox } from '../Page/PageStyledElements';
import SingleItem from '../Page/SingleItem';

const QuarterInput = ({
  name,
  description,
  start,
  stop,
  handleRemoveFields,
  id,
  handleChangeInput,
  setDate,
  state,
  handleSetItems,
  profile,
  token,
}): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  console.error({ state });

  return (
    <div className=" py-6 mt-10 -ml-9 mr-12 px-9">
      {/* <SelectItemsModal
        open={open}
        setOpen={setOpen}
        getItems={getQuarterItems}
        state={state}
        items={items}
        handleSubmit={() => {
          setOpen(!open);
          handleSetItems(id);
        }}
      /> */}
      <ItemsModal
        open={open}
        close={setOpen}
        existingItems={state}
        setNewItems={(data) => {
          // getQuarterItems(data)
          handleSetItems(id, data);
        }}
        profile={profile}
        token={token}
        type={'Quarter'}
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
            // dateValue={start ? new Date() : new Date()}
            dateValue={start}
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
            // dateValue={start ? new Date() : new Date()}
            dateValue={stop}
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
      <div className="mt-7">
        <div className="grid grid-cols-4 gap-2">
          {state.map((item, index) => {
            console.error({ item });
            return <SingleItem key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default QuarterInput;
