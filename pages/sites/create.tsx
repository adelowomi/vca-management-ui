import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import {
  Profile,
} from '../../classes/schema';
import { Site } from '../../classes/Site';
import { User } from '../../classes/User';
import { FormInput } from '../../components/FormInput/formInput';
import Layout from '../../components/Layout/Layout';
import { AddMenuItem } from '../../components/MenuItems/AddMenuItem';
import { MenuItemListItem } from '../../components/MenuItems/MenuItemListItem';
import { Btn } from '../../components/Page/PageButtons';
import { Container, FormGroup } from '../../components/Page/PageStyledElements';
import { GqlErrorResponse } from '../../errors/GqlError';

export const create = ({
  token,
  profile,
}: {
  error: GqlErrorResponse;
  token: any;
  profile: Profile;
}): JSX.Element => {
    
  const { addToast } = useToasts();
  const [working, setWorking] = useState(false);
  const [menuItems,setMenuItems] = useState([]);
  const router = useRouter();
  const _thisSite = new Site(token as unknown as string);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async (data) => {
    setWorking(true);
    data.account = profile.account.id;
    //TODO: discuss the type value on header with the team 
    data.header.type = "Page";
    data.header.name = data.name;
    data.header.menuItems = menuItems;
    try {
      const result = await _thisSite.createSite({
        input: data,
        token:token,
      });
      if (!result.status) {
        console.error(result);
        addToast(data.error.message ? data.error.message : "An error occurred", { appearance: 'error' });
        setWorking(false);
        return;
      }
      addToast('Your Site has been created', { appearance: 'success' });
      setWorking(false);
      router.push('/sites')
      return;
    } catch (error) {
      console.error(error);
      addToast(error.error.message ? error.error.message :'An error occurred', { appearance: 'error' });
      setWorking(false);
    }
    console.error(data);
  };

  const addItem =(item) =>{
      setMenuItems([...menuItems,item])
      console.error({item})
  }

  const removeItem = (item,index) => {
      const items = menuItems;
      const poppedItems = (items.splice(index,1));
      setMenuItems([...poppedItems]);
      
  }
  return (
    <Layout isPAdmin={true}>
      <Container className="mt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-3xl">Create a new website</h1>
            <div className="flex flex-row justify-start space-x-5">
              <Btn color="primary" $bg="secondary" $px="sm">
                <Link href="/sites"> Cancel</Link>
              </Btn>
              <Btn color="secondary" $bg="primary" $px="lg">
                {working ? 'Saving..' : 'Save Changes'}
              </Btn>
            </div>
          </div>
          <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
            Add site settings
          </div>
          <div className="grid grid-cols-2  w-form-col">
            <FormGroup className="">
              <FormInput
                name="name"
                label="Site Name"
                register={register}
                error={errors.name}
                required={true}
              />
            </FormGroup>
            <FormGroup className="">
              <FormInput
                name="header.logoUrl"
                label="Logo Url"
                register={register}
                error={errors.header}
                required={true}
              />
            </FormGroup>
          </div>
        </form>
          <hr className="border-gray-400 border-5 w-full mt-8" />
          <AddMenuItem addMenuItem={addItem} newSite={true}/>
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
                  <tbody className="divide-y divide-gray-200">
                    {menuItems.map((item, index) => {
                      return (
                        <MenuItemListItem
                          key={index}
                          index={index}
                          remove={removeItem}
                          item={item}
                          newSite
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);
  const user = new User(session.idToken);
  const token = session.idToken;

  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return;
  }

  const profile = await (await user.getProfile()).data;

  return {
    props: {
      error: null,
      token,
      profile,
    },
  };
};

export default create;
