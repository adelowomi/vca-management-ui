import { getSession } from '@auth0/nextjs-auth0';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

import Layout from '../../components/Layout/Layout';
import { Container } from '../../components/Page/PageStyledElements';
import { SITES_QUERY } from '../../graphql/site';
import { createApolloClient } from '../../lib/apollo';
import { PageActionsColOneBtn } from './[siteId]/pages';

const Sites = ({ sites, error }) => {
  let count = 0;
  const {
    query: { siteId },
  } = useRouter();

  return error ? (
    <div>{error}</div>
  ) : (
    <Layout>
      <Container>
      <div className="mt-12 flex flex-col">
          <div className="flex flew-row justify-between items-center" >
            <h1 className="text-4xl font-semibold">Sites</h1>
            <PageActionsColOneBtn className="focus:outline-none">
              <Link href={`/sites/${siteId}/pages/create`}> Add New</Link>
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
                                <Link href={`/sites/${site.id}/pages`}>
                                  {""}
                                </Link>
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
                                  <Link
                                    href={`/sites/${site.id}/edit`}
                                  >
                                    <p>Edit</p>
                                  </Link>

                                  <RiDeleteBinLine
                                    className="h-6"
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
      <h1 className="text-lg">Welcome to all sites Sites</h1>
      {sites.map((el) => {
        return (
          <div className="text-blue-500" key={el.id}>
            <span className="pr-8 text-black">{++count}</span>
            <Link href={`/sites/${el.id}`}>
              <a>{el.name}</a>
            </Link>
          </div>
        );
      })}
    </Layout>
  );
};


export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  const client = createApolloClient(session.idToken);

  try {
    const {
      data: { sites },
    } = await client.query({ query: SITES_QUERY,variables:{
      accountId: "60f59c39ec17e50015be506e"
    } });
    return { props: { sites } };
  } catch (error) {
    return { props: { error: 'Error loading........' } };
  }
}

export default Sites;
