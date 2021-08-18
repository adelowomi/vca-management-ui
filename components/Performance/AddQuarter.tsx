import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BaseDatePicker } from '../DatePicker/DatePicker';
import { ShadowBtn } from '../Page/PageButtons';
import { Input } from '../Page/PageInput';
import { Grid, H2, ImageSelectBox } from '../Page/PageStyledElements';
import ItemCard from '../utilsGroup/ItemCard';
import { SelectItemsModal } from '../utilsGroup/SelectItemsModal';

export const AddQuarter = ({ handleAddFields, items }) => {
  const [open, setOpen] = React.useState(false);
  const [quarterData, setQuarterData] = React.useState({
    id: uuidv4(),
    name: '',
    description: '',
    start: new Date(),
    stop: new Date(),
    items: [],
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setQuarterData({
      ...quarterData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    handleAddFields(quarterData);
    setQuarterData({
      id: uuidv4(),
      name: '',
      description: '',
      start: new Date(),
      stop: new Date(),
      items: [],
    });
  };

  const setItems = (items: any) => {
    setQuarterData({
      ...quarterData,
      items: [...items],
    });
  };

  const setDate = (date: any, name: string) => {
    setQuarterData({
      ...quarterData,
      [name]: date?.toISOString(),
    });
  };
  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <div className="border border-black py-6 mt-10 -ml-9 mr-12 px-9">
      <SelectItemsModal
        open={open}
        setOpen={setOpen}
        getItems={setItems}
        state={quarterData.items}
        items={items}
        handleSubmit={handleSubmit}
      />
      <H2 className="mt-5 mb-10">Add a new quarter</H2>
      <Grid className="space-x-5 mt-5">
        <div className="w-full mt-">
          <H2>Name</H2>
          <Input
            className="py-4 w-96 "
            placeholder="Name"
            onChange={onChange}
            name="name"
            value={quarterData.name}
          />
        </div>

        <div className="w-full mt-">
          <H2>Description</H2>
          <Input
            className="py-4 w-96 "
            placeholder="lorem ipsum"
            onChange={onChange}
            name="description"
            value={quarterData.description}
          />
        </div>
      </Grid>
      <Grid className="space-x-5 mt-5">
        <div className="w- mt- w-96">
          <H2 className="mb-5">Start date</H2>
          <BaseDatePicker
            dateValue={quarterData.start}
            setDate={setDate}
            name="start"
          />
        </div>
        <div className="w- mt- w-96">
          <H2 className="mb-5">Stop date</H2>

          <BaseDatePicker
            dateValue={quarterData.stop}
            setDate={setDate}
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
      <div className="grid grid-cols-3 gap-4">
        {quarterData.items.map((el: any) => {
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
      <ShadowBtn
        bg="primary"
        className="py-4 px-10 mt-5 shadow-sm  rounded text-sm font-bold"
        onClick={onSubmit}
      >
        Add quarter
      </ShadowBtn>
    </div>
  );
};
