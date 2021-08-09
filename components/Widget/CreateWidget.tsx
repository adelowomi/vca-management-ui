import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import {
  CreateWidgetInput,
  UpdateWidgetInput,
  Widget,
} from '../../classes/schema';
import { Widgets } from '../../classes/Widget';
import { FormInput } from '../FormInput/formInput';
import { NewsWidget } from '../NewsWidget/NewsWidget';
import { ItemsModal2 } from '../Page/ItemsModal2';
import { ShadowBtn } from '../Page/PageButtons';
import {
  ColumnSection,
  FormGroup,
  Grid,
  H2,
  ImageSelectBox,
} from '../Page/PageStyledElements';

export const CreateWidget = ({
  token,
  items,
  existingWidget,
  profile,
}: {
  items: any[];
  token: string;
  existingWidget: Widget;
  profile: any;
}): JSX.Element => {

  const {
    query: { id },
  } = useRouter();
  const { addToast } = useToasts();
  const _thisWidget = new Widgets(token);
  const [open, setOpen] = useState(false);
  const [working, setWorking] = useState(false);
  const [widgetItems, setWidgetItems] = useState(existingWidget.items ?? []);
  const [showPreview, setShowPreview] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UpdateWidgetInput>({
    defaultValues: {
      title: existingWidget.title ?? '',
      description: existingWidget.description ?? '',
    },
  });

  const watching = watch();

  const onSubmit = async (data: any) => {
    setWorking(true);
    data.items = widgetItems.map((item) => item.id);
    console.error(existingWidget);
    console.error({widgetItems});
    console.error(data.items);
    
    
    if (existingWidget.id) {
      await updateWidget(data);
      return;
    }
    await createWidget(data);
  };

  const createWidget = async (data: any) => {
    data.page = id;
    data.disable = false;
    data.type = 'ITEM';
    data.account = profile.account.id;
    console.error(data);

    try {
      const result = await _thisWidget.createWidget({
        input: data as CreateWidgetInput,
      });
      if (!result.status) {
        console.error(result);
        addToast(
          data.error.message ? data.error.message : 'An error occurred',
          { appearance: 'error' }
        );
        setWorking(false);
        return;
      }
      addToast('Your widget has been updated successfully', {
        appearance: 'success',
      });
      setWorking(false);
    } catch (error) {
      console.error(error);
      addToast(
        error.error.message ? error.error.message : 'An error occurred',
        { appearance: 'error' }
      );
    }
  };

  const updateWidget = async (data: any) => {
      
    try {
      const result = await _thisWidget.updateWidget({
        input: data as UpdateWidgetInput,
        widgetId: existingWidget.id,
      });
      if (!result.status) {
        console.error(result);
        addToast(
          data.error.message ? data.error.message : 'An error occurred',
          { appearance: 'error' }
        );
        setWorking(false);
        return;
      }
      addToast('Your widget has been updated successfully', {
        appearance: 'success',
      });
      setWorking(false);
    } catch (error) {
      console.error(error);
      addToast(
        error.error.message ? error.error.message : 'An error occurred',
        { appearance: 'error' }
      );
    }
  };

  return (
    <>
      <ItemsModal2
        open={open}
        close={setOpen}
        items={items}
        existingItems={existingWidget.items}
        setNewItems={setWidgetItems}
      />
      <ColumnSection>
        <H2 className="mb-5">2. Widget section</H2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid className="space-x-5">
            <div className="flex flex-col w-full">
              <div className="w-full ">
                <FormGroup className="">
                  <FormInput
                    name="title"
                    label="Widget Title"
                    register={register}
                    error={errors.title}
                    required={true}
                    disableLabel
                  />
                </FormGroup>
              </div>
            </div>
            <div className="w-full">
              <FormGroup className="">
                <FormInput
                  name="description"
                  label="Description"
                  register={register}
                  error={errors.description}
                  required={true}
                  disableLabel
                />
              </FormGroup>
            </div>
            <div className="w-full ">
              <ImageSelectBox
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-center cursor-pointer"
              >
                <p>+ Add posts</p>
              </ImageSelectBox>
            </div>
            <div className="w-full ml-0"></div>
          </Grid>

          <ColumnSection>
            <div className="">
              <ShadowBtn
                className="py-4 px-10 shadow-sm rounded text-sm font-bold bg-vca-blue"
                onClick={() => setShowPreview(!showPreview)}
                type="button"
              >
                {showPreview ? ' Hide Preview' : 'Show Preview'}
              </ShadowBtn>
            </div>
          </ColumnSection>
          {showPreview ? (
            <NewsWidget
              allItems={items}
              items={widgetItems}
              title={watching.title ?? existingWidget.title}
              desc={watching.description ?? existingWidget.description}
              contain={true}
            />
          ) : null}
          <ColumnSection>
            <div className="">
              <ShadowBtn
                className="py-4 px-10 shadow-sm rounded text-sm font-bold bg-vca-blue"
                type="submit"
              >
                {working ? ' Saving...' : 'Save'}
              </ShadowBtn>
            </div>
          </ColumnSection>
        </form>
      </ColumnSection>
    </>
  );
};
