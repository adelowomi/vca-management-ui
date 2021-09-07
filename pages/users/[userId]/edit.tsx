import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import {
  AccountType,
  Profile,
  UpdateProfileInput,
} from '../../../classes/schema';
import { User } from '../../../classes/User';
import { FormInput } from '../../../components/FormInput/formInput';
import FormSelect from '../../../components/FormSelect/VcaSelect';
import Layout from '../../../components/Layout/Layout';
import { Btn } from '../../../components/Page/PageButtons';
import {
  Container,
  FormGroup,
} from '../../../components/Page/PageStyledElements';
import useUnsavedChangesWarning from '../../../hooks/useUnsavedChangesWarning';

const typeOptions = Object.values(AccountType);

export const edit = ({
  profile,
  token,
}: {
  profile: Profile;
  token: string;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileInput>({
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
    },
  });

  const router = useRouter();
  const { addToast } = useToasts();
  const [working, setWorking] = useState(false);
  const [userRole, setUserRole] = useState(profile.accountType as string);
  const _thisUser = new User(token);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onSubmit = async (data) => {
    data.accountType = userRole;
    setWorking(true);
    try {
      const result = await _thisUser.updateProfile({
        input: data as unknown as UpdateProfileInput,
        userId: profile.userId,
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
      addToast('Updated Successfully', { appearance: 'success' });
      setWorking(false);
      router.push('/users');
      refreshData();
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
  useUnsavedChangesWarning(isDirty);

  return (
    <Layout isPAdmin={true}>
      <Container className="mt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-3xl">Edit User</h1>
            <div className="flex flex-row justify-start space-x-5">
              <Btn color="primary" $bg="secondary" $px="sm" disabled>
                <Link href="/users"> Cancel</Link>
              </Btn>
              <Btn color="secondary" $bg="primary" $px="lg">
                {working ? 'Saving..' : 'Save'}
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
          </div>
          <hr className="border-gray-400 border-5 w-full mt-8" />

          <FormGroup className="mt-5">
            <FormSelect
              defaultOption={{
                id: 0,
                name: profile.accountType,
                value: profile.accountType,
                unavailable: false,
              }}
              onChange={(data) => setUserRole(data.value)}
              label="User Role"
              options={typeOptions.map((item, index) => {
                return {
                  value: item as unknown as string,
                  name: item as unknown as string,
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

  //FIXME: profile query fails, bypassingfor now
  //   const profile = await (await user.getUserProfile({userId:ctx.query.userId as unknown as string})).data;

  const profile = await (await user.getProfile()).data;

  const profiles = await (
    await user.getAllProfiles({ accountId: profile.account.id })
  ).data;

  return {
    props: {
      profile: profiles.filter((p) => p.id == ctx.query.userId)[0],
      token: session.idToken,
    },
  };
};

export default edit;
