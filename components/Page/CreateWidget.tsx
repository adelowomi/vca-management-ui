import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React from 'react';

import { widgetvalidator } from '../../helpers/widgetValidator';
import { widgetUseForm } from '../../hooks/widgetUseForm';
import { NewsWidget } from '../NewsWidget/NewsWidget';
import { SelectItemsModal } from '../utilsGroup/SelectItemsModal';
import { ShadowBtn } from './PageButtons';
import { Input } from './PageInput';
import { ColumnSection, Grid, H2, ImageSelectBox } from './PageStyledElements';

type WidgetProps = {
  pageId: string | string[];
  client: ApolloClient<NormalizedCacheObject>;
  items: {
    id: string;
    mediaUrl: string;
    title: string;
    content: string;
  }[];
  widget: any;
  accountId: string;
};

export const CreateWidget: React.FC<WidgetProps> = ({
  pageId,
  client,
  items,
  widget,
  accountId,
}): JSX.Element => {
  const {
    handleSubmit,
    state,
    errors,
    setState,
    handleChange,
    open,
    setOpen,
  } = widgetUseForm(widgetvalidator, client, pageId, widget, accountId);

  const getItems = (selected: any) => {
    setState({
      ...state,
      widgetItems: [...selected],
    });
  };

  return (
    <>
      <ColumnSection>
        <Grid className="space-x-5">
          <div className="flex flex-col w-full">
            <H2 className="mb-5">2. Widget section</H2>
            <div className="w-full">
              <Input
                className="py-4 w-72"
                placeholder="Add a title"
                name="widgetTitle"
                onChange={handleChange}
                value={state.widgetTitle}
              />
              {errors && errors.widgetTitle && (
                <span className="text-red-500 mt-1 text-sm font-medium">
                  {errors.widgetTitle}
                </span>
              )}
            </div>
          </div>

          <div className="w-full mt-12">
            <Input
              className="py-4 w-72 "
              placeholder="Description"
              name="widgetDescription"
              onChange={handleChange}
              value={state.widgetDescription}
            />
            {errors && errors.widgetDescription && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.widgetDescription}
              </span>
            )}
          </div>

          <div className="w-full mt-12">
            <ImageSelectBox
              onClick={() => setOpen(!open)}
              className="flex w-full items-center justify-center cursor-pointer"
            >
              <p>+ Add posts</p>
            </ImageSelectBox>
            {errors && errors.widgetItems && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.widgetItems}
              </span>
            )}
          </div>
        </Grid>
        <div className="mt-5">
          <ShadowBtn className="py-4 px-10 shadow-sm rounded text-sm font-bold">
            Preview body
          </ShadowBtn>
        </div>
        <NewsWidget
          allItems={items}
          items={state.widgetItems}
          title={state.widgetTitle}
          desc={state.widgetDescription}
          contain={true}
        />
      </ColumnSection>
      {/* {console.log({ STATE: state.widgetItems })} */}
      <SelectItemsModal
        open={open}
        setOpen={setOpen}
        getItems={getItems}
        state={state.widgetItems}
        handleSubmit={handleSubmit}
        items={items}
      />
    </>
  );
};
