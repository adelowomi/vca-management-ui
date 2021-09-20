import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import {
  Menuitem,
  MenuItemType,
  UpdateMenuitemInput,
} from '../../classes/schema';
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

export const EditMenuItemModal = ({
  modalIsOpen,
  closeModal,
  item,
  token
}: {
  modalIsOpen: any;
  closeModal: any;
  item: Menuitem;
  token: any
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateMenuitemInput>({
    defaultValues: {
      name: item.name,
      description: item.description,
      type: item.type,
      slug: item.slug,
      active: item.active,
    },
  });
  const { addToast} = useToasts();
  const [newState, setNewState] = useState(item.active);
  const [newType, setNewType] = useState('');
  const [updating,setUpdating] = useState(false);
  const [externalLink, setExternalLink] = useState(item.slug ? true : false)

  
  

  const _thisSite = new Site(token);

  const onSubmit = async (data) => {
    data.active = newState;
    newType ? (data.type = newType) : null;
    setUpdating(true);
    try {
        const result = await (await _thisSite.updateMenuItem({input:data,menuId:item.id}));
        if(!result.status){
            addToast("An Error Occurred",{ appearance : 'error'})
            setUpdating(false);
            return;
        }

        addToast("Updated Successfully",{ appearance : 'success'})
        closeModal();
        setUpdating(false);
        return;
        
    } catch (error) {
        console.error(error);
        setUpdating(false)
        addToast(error.error.message ? error.error.message :'An error occurred',{ appearance : 'error'})
    }
  };
  const cancelButtonRef = useRef();
  return (
    <Transition show={modalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={modalIsOpen}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-auto sm:w-auto sm:p-6 h-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
                  Edit MenuItem
                </div>
                <div className="grid grid-cols-2  w-form-col">
                  <FormGroup className="">
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
                      name: item.active ? 'Active' : 'InActive',
                      value: (item.active as unknown) as string,
                      unavailable: false,
                    }}
                    onChange={(data) => setNewState(data.value as unknown as boolean)}
                    label="Select state"
                    options={options}
                    error={errors.active}
                    errorText={'select a state'}
                  />
                  <FormSelect
                    defaultOption={{
                      id: 0,
                      name: item.type,
                      value: item.type,
                      unavailable: false,
                    }}
                    onChange={(data) => setNewType(data.value)}
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
                    checked={externalLink}
                    onChange={() => setExternalLink(!externalLink)}
                  />
                  <label className="font-semibold leading-6 text-lg text-vca-grey-1 font-inter">
                    This is an external link
                  </label>
                </div>
                  {externalLink &&
                  <div className="flex flex-row justify-start space-x-5">
                    <FormInput
                      name="slug"
                      label=""
                      register={register}
                      error={errors.slug}
                      required={false}
                    />
                  </div>
                  }
                  <div className="w-full">
                    <Btn
                      color="secondary"
                      $bg="primary"
                      $px="sm"
                      className="mt-6"
                    >
                        
                        {updating ?  "Updating..." : "Update"}
                    </Btn>
                  </div>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
