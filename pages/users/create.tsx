import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { AccountType, CreateProfileInput } from '../../classes/schema';
import { User } from '../../classes/User';
import { FormInput } from '../../components/FormInput/formInput';
import FormSelect from '../../components/FormSelect/VcaSelect';
import Layout from '../../components/Layout/Layout';
import { Btn } from '../../components/Page/PageButtons';
import { Container, FormGroup } from '../../components/Page/PageStyledElements';

const typeOptions = Object.values(AccountType);

export const create = ({ token,profile }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { addToast } = useToasts();
  const [working, setWorking] = useState(false);
  const [userRole, setUserRole] = useState('');
  const _thisUser = new User(token);

  const onSubmit = async (data) => {
    data.accountType = userRole;
    data.account = profile.account.id
    setWorking(true);
    try {
      const result = await _thisUser.createProfile({
        input: data as CreateProfileInput,
      });
      if (!result.status) {
        addToast(
          data.error.message ? data.error.message : 'An error occurred',
          { appearance: 'error' }
        );
        console.error(result);
        setWorking(false);
        return;
      }
      addToast('User Created Successfully', { appearance: 'success' });
      setWorking(false);
      router.push('/users');
      return;
    } catch (error) {
      console.error(error);
      setWorking(false);
      addToast(
        error.error.message ? error.error.message : 'An error occurred',
        { appearance: 'error' }
      );
      return;
    }
  };

  return (
    <Layout isPAdmin={true}>
      <Container className="mt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-3xl">Add New User</h1>
            <div className="flex flex-row justify-start space-x-5">
              <Btn color="primary" $bg="secondary" $px="sm" disabled>
                <Link href="/users"> Cancel</Link>
              </Btn>
              <Btn color="secondary" $bg="primary" $px="lg">
                {working ? 'Saving..' : 'Add User'}
              </Btn>
            </div>
          </div>
          <div className="mt-10 mb-5 font-semibold leading-6 text-xl text-vca-grey-1 font-inter">
            User Information
          </div>
          <div className="grid grid-cols-2  w-form-col">
            <FormGroup className="">
              <FormInput
                name="firstName"
                label="First Name"
                register={register}
                error={errors.firstName}
                required={true}
              />
            </FormGroup>
            <FormGroup className="">
              <FormInput
                name="lastName"
                label="Last Name"
                register={register}
                error={errors.lastName}
                required={true}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <FormInput
                name="email"
                label="Email Address"
                register={register}
                error={errors.email}
                required={true}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <FormInput
                name="password"
                label="Password"
                register={register}
                error={errors.password}
                required={true}
              />
            </FormGroup>
          </div>
          <hr className="border-gray-400 border-5 w-full mt-8" />

          <FormGroup className="mt-5">
            <FormSelect
              defaultOption={{
                id: 0,
                name: 'Select role',
                value: '',
                unavailable: false,
              }}
              onChange={(data) => setUserRole(data.value)}
              label="User Role"
              options={typeOptions.map((item, index) => {
                return {
                  value: (item as unknown) as string,
                  name: (item as unknown) as string,
                  id: index,
                  unavailable: false,
                };
              })}
              error={errors}
              errorText={'User Role'}
            />
          </FormGroup>
        </form>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);
  const user = new User(session.idToken);
  const profile = await (await user.getProfile()).data;
  return {
    props: {
      error: null,
      user: session.user,
      token: session.idToken,
      profile
    },
  };
};

export default create;
