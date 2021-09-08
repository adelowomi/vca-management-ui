import React, { useState } from 'react';
import {  useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { CreateMenuitemInput, MenuItemType } from '../../classes/schema';
import { Site } from '../../classes/Site';
import { FormInput } from '../FormInput/formInput';
import FormSelect from '../FormSelect/VcaSelect';
import { Btn } from '../Page/PageButtons';
import { FormGroup } from '../Page/PageStyledElements';

const options = [
  {
    id: 1,
    name: 'Active',
    value: (true as unknown) as string,
    unavailable: false,
  },
  {
    id: 2,
    name: 'InActive',
    value: (false as unknown) as string,
    unavailable: false,
  },
];

const typeOptions = Object.values(MenuItemType);

export const AddMenuItem = ({
  siteId,
  token,
  reload,
  addMenuItem,
  newSite,
}: {
  siteId?: string;
  token?: string;
  reload?: any;
  addMenuItem?:any;
  newSite?:boolean;
}): JSX.Element => {
  const _thisSite = new Site(token);
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [type, setType] = useState('');
  const [newState, setNewState] = useState(true);
  const [working,setWorking] = useState(false);
  const [useExternalLink,setUseExternalLink] = useState(false);


  const onSubmit = async (data) => {
      data.active = newState;
      type ? (data.type = type) : (data.type = "PAGE");
      if(newSite) {
          addMenuItem(data);
          reset();
          return;
    }
      setWorking(true);
    try {
      const result = await _thisSite.addMenuItem({
        siteId: siteId,
        item: (data as unknown) as CreateMenuitemInput,
      });
      if (!result.status) {
          setWorking(false);
        console.error(result);
        addToast('An error occurred', { appearance: 'error' });
        return;
      }
      addToast('Added Successfully', { appearance: 'success' });
      setWorking(false);
      reset();
      reload();
      return;
    } catch (error) {
      console.error(error);
      addToast('An error occurred', { appearance: 'error' });
      setWorking(false);
    }
  };
  return (
    <>
      <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
        Add MenuItems
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2  w-form-col">
          <FormGroup>
            <FormInput
              name="name"
              label="Name"
              register={register}
              error={errors.name}
              required={true}
            />
          </FormGroup>
          <FormGroup className="">
            <FormInput
              name="description"
              label="Description"
              register={register}
              error={errors.description}
              required={true}
            />
          </FormGroup>
          <FormSelect
            defaultOption={{
              id: 0,
              name: '',
              value: null,
              unavailable: false,
            }}
            onChange={(data) => setNewState((data.value as unknown) as boolean)}
            label="Select state"
            options={options}
            error={errors}
            errorText={'select a type'}
          />
          <FormSelect
            defaultOption={{
              id: 0,
              name: '',
              value: null,
              unavailable: false,
            }}
            onChange={(data) => setType(data.value)}
            label="Select type"
            options={typeOptions.map((item, index) => {
              return {
                value: (item as unknown) as string,
                name: (item as unknown) as string,
                id: index,
                unavailable: false,
              };
            })}
            error={errors.type}
            errorText={'select a type'}
          />
        </div>
        <div className="grid grid-cols-2 mt-3 w-form-col">
          <div className="flex mt-10" style={{ width: '380px' }}>
            <input
              type="checkbox"
              className="px-3 h-6 w-6 border border-gray-300 mr-3"
              name=""
              id=""
              checked={useExternalLink}
              onChange={() => setUseExternalLink(!useExternalLink)}
            />
            <label className="font-semibold leading-6 text-lg text-vca-grey-1 font-inter">
              This is an external link
            </label>
          </div>
          <div className="flex flex-row justify-start space-x-5">
            {useExternalLink ? 
            <FormInput
              name="slug"
              label=""
              register={register}
              error={errors.slug}
              required={true}
              
            />
            : null}
            <Btn
              color="secondary"
              $bg="primary"
              $px="sm"
              style={{ width: '92px', height: '56px' }}
              className="mt-6"
            >
                {working ? "Adding..." : "Add"}
            </Btn>
          </div>
        </div>
      </form>
    </>
  );
};
