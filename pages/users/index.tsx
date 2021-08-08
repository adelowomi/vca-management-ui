import { getSession } from '@auth0/nextjs-auth0';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';

import { Profile } from '../../classes/schema';
import { User } from '../../classes/User';
import Layout from '../../components/Layout/Layout';
import { Container } from '../../components/Page/PageStyledElements';
import DeleteModal from '../../components/utilsGroup/DeleteModal';
import { PageActionsColOneBtn } from '../sites/[siteId]/pages';

export const index = ({ profiles,token }: { profiles: Profile[],token:any }): JSX.Element => {
  const router = useRouter();
  const { addToast } = useToasts();
  const [userToDelete, setUserToDelete] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const removeUser = async () => {
    console.error(userToDelete);
    
    try {
      const result = await await new User(token).softDelete({userId:userToDelete});
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
  }

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const triggerDelete = (userId) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };
  return (
    <Layout isPAdmin={true}>
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
            <PageActionsColOneBtn className="focus:outline-none">
              <Link href={`/users/create`}> Add New</Link>
            </PageActionsColOneBtn>
          </div>
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
                    {profiles.map((profile, index) => (
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
                              <p>{moment(profile.createdAt).format('llll')}</p>
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
                              onClick={() => triggerDelete(profile.id)}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
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

  const profile = await (await user.getProfile()).data;

  const profiles = await (
    await user.getAllProfiles({ accountId: profile.account.id })
  ).data;

  return {
    props: {
      profiles,
      token:session.idToken
    },
  };
};

export default index;
