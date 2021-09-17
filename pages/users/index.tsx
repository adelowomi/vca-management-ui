import { getSession } from '@auth0/nextjs-auth0';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';

import { Profile } from '../../classes/schema';
import { User } from '../../classes/User';
import { FormInput } from '../../components/FormInput/formInput';
import Layout from '../../components/Layout/Layout';
import { Container } from '../../components/Page/PageStyledElements';
import DeleteModal from '../../components/utilsGroup/DeleteModal';
import { PageActionsColOneBtn } from '../sites/[siteId]/pages';

export const index = ({
  profiles,
  token,
  profile,
}: {
  profiles: Profile[];
  token: any;
  profile: Profile;
}): JSX.Element => {
  const router = useRouter();
  const page = parseInt(router.query?.page as string, 10) || 0;
  const currentPageUrl = router.asPath.split('?')[0];
  const nextPage = `${currentPageUrl}?search=${
    router.query?.search || ''
  }&page=${page + 1}`;
  const prevPage = `${currentPageUrl}?search=${
    router.query?.search || ''
  }&page=${page - 1 < 0 ? 0 : page - 1}`;
  const { addToast } = useToasts();
  const [userToDelete, setUserToDelete] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const onSubmit = async (data) => {
    router.push({
      query: {
        search: data.search,
        page: 0,
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const removeUser = async () => {
    console.error(userToDelete);

    try {
      const result = await await new User(token).softDelete({
        userId: userToDelete,
      });
      if (!result.status) {
        addToast('An Error Occurred', { appearance: 'error' });
        return;
      }
      addToast('Deleted Successfully', { appearance: 'success' });
      refreshData();
    } catch (error) {
      console.error(error);
      addToast('An error occurred', { appearance: 'error' });
    }
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const triggerDelete = (userId) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };
  return (
    <Layout isPAdmin={true} profile={profile}>
      <Container className="mt-12">
        <DeleteModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          name="User"
          handleIsdeleted={removeUser}
        />
        <div className="mt-12 flex flex-col">
          <div className="flex flew-row justify-between items-center">
            <h1 className="text-4xl font-semibold">Users</h1>
            <Link href={`/users/create`}>
              <PageActionsColOneBtn className="focus:outline-none">
                Add New
              </PageActionsColOneBtn>
            </Link>
          </div>
        </div>
        <form
          className="flex flex-row items-center mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-2">
            <FormInput
              name="search"
              label="Search"
              register={register}
              error={errors.search}
              required={false}
              disableLabel={true}
            />
          </div>
          <button
            type="submit"
            className="ml-6 bg-vca-blue h-14 text-white font-bold text-sm"
          >
            <div className="flex flex-row mx-8 ">
              <div className="mr-2">Search</div>
            </div>
          </button>
        </form>
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
                        User
                      </th>
                      <th scope="col" className="px-6 tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 tracking-wider">
                        Creation date & time
                      </th>
                      <th scope="col" className="px-6  tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {profiles
                      .filter((p) => p.isActive)
                      .map((profile, index) => (
                        <tr className={`text-left`} key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600">
                            <input
                              type="checkbox"
                              className="px-3 h-5 w-6 border border-gray-300"
                              name=""
                              id=""
                            />
                          </td>
                          <td className="px-6 py-4 text-gray-500 whitespace-nowrap ">
                            <Link href={`/users/${profile.id}/edit`}>
                              {`${profile.firstName} ${profile.lastName}`}
                            </Link>
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-500">
                            <Link href={`/users/${profile.id}/edit`}>
                              {profile.accountType}
                            </Link>
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace-nowrap text-gray-500">
                            <Link href={`/users/${profile.id}/edit`}>
                              <span>
                                <p>
                                  {moment(profile.createdAt).format('llll')}
                                </p>
                              </span>
                            </Link>
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-800">
                            <span className="flex space-x-5">
                              <Link href={`/users/${profile.id}/edit`}>
                                <p>Edit</p>
                              </Link>
                              <RiDeleteBinLine
                                className="h-6"
                                onClick={() => triggerDelete(profile.userId)}
                              />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-9 flex flex-row justify-between">
                <Link href={`${prevPage}`}>
                  <a className="flex flex-row hover:text-vca-blue">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    </div>
                    <div className="ml-2">Previous</div>
                  </a>
                </Link>
                {profiles.length !== 0 ? (
                  <Link aria-label="Next" href={`${nextPage}`}>
                    <a className="flex flex-row hover:text-vca-blue">
                      <div className="mr-2">Next</div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </a>
                  </Link>
                ) : (
                  ''
                )}
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
  let page = 0;
  let variables;
  const user = new User(session.idToken);

  if (ctx.query.page) {
    page = ctx.query.page as unknown as number;
  }

  variables = {
    limit: 10,
    skip: 10 * page,
  };

  if (ctx.query.search) {
    variables = {
      ...variables,
      filter: {
        combinedFilter: {
          logicalOperator: 'OR',
          filters: [
            {
              singleFilter: {
                field: 'firstName',
                operator: 'REGEX',
                value: ctx.query.search ? ctx.query.search : '',
                options: 'i',
              },
            },
            {
              singleFilter: {
                field: 'lastName',
                operator: 'REGEX',
                value: ctx.query.search ? ctx.query.search : '',
                options: 'i',
              },
            },
          ],
        },
      },
    };
  }

  const profile = await (await user.getProfile()).data;

  const profiles = await (
    await user.getAllProfiles({ accountId: profile.account.id, ...variables })
  ).data;

  return {
    props: {
      profiles,
      profile,
      token: session.idToken,
    },
  };
};

export default index;
