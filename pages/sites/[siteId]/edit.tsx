import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { FormInput } from '../../../components/FormInput/formInput';
import FormSelect from '../../../components/FormSelect/VcaSelect';
import Layout from '../../../components/Layout/Layout';
import { Btn } from '../../../components/Page/PageButtons';
import {
  Container,
  FormGroup,
} from '../../../components/Page/PageStyledElements';

const options = [
  { id: 1, name: 'Active', value: 'Active', unavailable: false },
];

export const Edit = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const {
    query: { siteId },
  } = useRouter();

  return (
    <Layout>
      <Container className="mt-12">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold text-3xl">Edit website settings</h1>
          <div className="flex flex-row justify-start space-x-5">
            <Btn color="primary" $bg="secondary" $px="sm">
              <Link href="/sites"> Cancel</Link>
            </Btn>
            <Btn color="secondary" $bg="primary" $px="lg">
              Save Changes
            </Btn>
          </div>
        </div>
        <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
          Add the site settings
        </div>
        <div className="flex flex-row justify-start space-x-7">
          <FormGroup className="">
            <FormInput
              name="sitename"
              label=""
              register={register}
              error={errors.name}
              required={true}
            />
          </FormGroup>
          <FormGroup className="">
            {/* <Label htmlFor="pageTitle" className="mb-6">
            Add the site settings
          </Label> */}
            <FormInput
              name="logo"
              label=""
              register={register}
              error={errors.name}
              required={true}
            />
          </FormGroup>
        </div>
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
          Add MenuItems
        </div>
        <div className="grid grid-cols-2  w-form-col">
          <FormGroup className="">
            <FormInput
              name="name"
              label="name"
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
              error={errors.logoUrl}
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
            onChange={(data) => console.error(data)}
            label="Select type"
            options={options}
            error={errors.type}
            errorText={'select a type'}
          />
          <FormSelect
            defaultOption={{
              id: 0,
              name: '',
              value: null,
              unavailable: false,
            }}
            onChange={(data) => console.error(data)}
            label="Select type"
            options={[]}
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
            />
            <label className="font-semibold leading-6 text-lg text-vca-grey-1 font-inter">
              This is an external link
            </label>
          </div>
          <div className="flex flex-row justify-start space-x-5">
            <FormInput
              name="description"
              label=""
              register={register}
              error={errors.logoUrl}
              required={true}
            />
            <Btn
              color="secondary"
              $bg="primary"
              $px="sm"
              style={{ width: '92px', height: '56px' }}
              className="mt-6"
            >
              Add
            </Btn>
          </div>
        </div>
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
          Added Items
        </div>
        <div className="flex flex-col mt-5">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle  min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="" style={{ background: '#F2F2F2' }}>
                    <tr className="text-left text-gray-500 text-sm font-light">
                      <th
                        scope="col"
                        className="px-6 tracking-wider font-light py-4"
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="h-5 w-6"
                        />
                      </th>
                      <th scope="col" className="px-6 tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6  tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {siteId}
      </Container>
    </Layout>
  );
};

export default Edit;
