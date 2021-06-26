import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { BaseDatePicker } from '../DatePicker/DatePicker';
// import { ShadowBtn } from '../Page/PageButtons';
import { Input } from '../Page/PageInput';
import { Grid, H2, ImageSelectBox } from '../Page/PageStyledElements';

const QuarterInput = ({
  name,
  description,
  startDate,
  stopDate,
  handleRemoveFields,
  id,
}) => {
  return (
    <div className=" py-6 mt-10 -ml-9 mr-12 px-9">
      <H2 className="mt-5 mb-10">{name}</H2>
      <Grid className="space-x-5 mt-5">
        <div className="w-full mt-">
          <H2 className="mb-5">Name</H2>
          <Input
            className="py-4 w-96 "
            placeholder="Name"
            //   onChange={handleChange}
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
            //   onChange={handleChange}
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
          <BaseDatePicker name="startDate" dateValue={startDate} setDate />

          {/* {errors && errors.actionText && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.actionText}
              </span>
            )} */}
        </div>
        <div className="w- mt- w-96">
          <H2 className="mb-5">Stop date</H2>

          <BaseDatePicker name="startDate" dateValue={stopDate} setDate />

          {/* {errors && errors.actionText && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.actionText}
              </span>
            )} */}
        </div>
      </Grid>
      <ImageSelectBox
        className="mt-6 mb-6 w-96 flex items-center justify-center cursor-pointer"
        //   onClick={() => setOpen(!open)}
      >
        <p>+ Select posts</p>
      </ImageSelectBox>
      {/* <ShadowBtn
        bg="primary"
        className="py-4 px-10 shadow-sm  rounded text-sm font-bold"
      >
        Add quarter
      </ShadowBtn> */}
    </div>
  );
};

export default QuarterInput;
