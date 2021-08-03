import { getSession } from '@auth0/nextjs-auth0';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';

import { SiteView } from '../../classes/schema';
import { Site } from '../../classes/Site';
import { User } from '../../classes/User';
import Layout from '../../components/Layout/Layout';
import { Container } from '../../components/Page/PageStyledElements';
import DeleteModal from '../../components/utilsGroup/DeleteModal';
import { GqlErrorResponse } from '../../errors/GqlError';
import { PageActionsColOneBtn } from './[siteId]/pages';

const Sites = ({
  sites,
  error,
  token,
}: {
  sites: SiteView[];
  error: GqlErrorResponse;
  token: any;
}): JSX.Element => {
  const router = useRouter();
  const { addToast } = useToasts();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [siteToDelete, setSiteToDelete] = useState('');

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const removeSite = async () => {
    try {
      const result = await await new Site(token).removeSite({
        siteId: siteToDelete,
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

  const triggerDelete = (siteId) => {
    setSiteToDelete(siteId);
    setDeleteModalOpen(true);
  };

  return error ? (
    <div>{error}</div>
  ) : (
    <Layout isPAdmin={true}>
      <Container>
        <DeleteModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          name="Site"
          handleIsdeleted={removeSite}
        />
        <div className="mt-12 flex flex-col">
          <div className="flex flew-row justify-between items-center">
            <h1 className="text-4xl font-semibold">Sites</h1>
            <PageActionsColOneBtn className="focus:outline-none">
              <Link href={`/sites/create`}> Add New</Link>
            </PageActionsColOneBtn>
          </div>
        </div>
        {error ? (
          <>
            <div className="mt-24">
              <h3 className="text-center text-2xl">An error occurred</h3>
              <p className="text-center">
                An error occurred while trying to load pages
              </p>
            </div>
          </>
        ) : (
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
                          Site Name
                        </th>
                        <th scope="col" className="px-6 tracking-wider">
                          Admin
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
                      {sites.map((site: any) => (
                        <tr className={`text-left  `} key={site.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600">
                            <input
                              type="checkbox"
                              className="px-3 h-5 w-6 border border-gray-300"
                              name=""
                              id=""
                            />
                          </td>

                          <td className="px-6 py-4 text-gray-500 whitespace-nowrap ">
                            <Link href={`/sites/${site.id}/pages`}>
                              {site.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-500">
                            <Link href={`/sites/${site.id}/pages`}>{''}</Link>
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace-nowrap text-gray-500">
                            <Link href={`/sites/${site.id}/pages`}>
                              <span>
                                <p>{moment(site.createdAt).format('llll')}</p>
                              </span>
                            </Link>
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-800">
                            <span className="flex space-x-5">
                              <Link href={`/sites/${site.id}/edit`}>
                                <p>Edit</p>
                              </Link>

                              <RiDeleteBinLine
                                className="h-6"
                                onClick={() => triggerDelete(site.id)}
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
        )}
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);
  const user = new User(session.idToken);
  const site = new Site(session.idToken);

  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return;
  }

  const profile = await (await user.getProfile()).data;

  try {
    const data = await (
      await site.getAllSites({ accountId: profile.account.id })
    ).data;
    return {
      props: {
        sites: data,
        error: null,
        user: session.user,
        token: session.idToken,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        sites: [],
        error: GqlErrorResponse(error),
        user: session.user,
        token: session.idToken,
      },
    };
  }
};

export default Sites;
