import { getSession } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

import { PAGES_QUERY } from '../../../../graphql/schema';
import Layout from '../../../../layouts/Dashboard';
import { createApolloClient } from '../../../../lib/apollo';

const Pages = ({
  pages: {
    data: { pages },
  },
}) => {
  let count = 0;
  const [dropdown, setDropdown] = React.useState(false);
  const dropdownClick = () => setDropdown(!dropdown);
  return (
    <Layout>
      <div className="container">
        <div className="flex justify-self-start items-center">
          <div className="header_text mr-16">
            <h1 className="text-2xl font-medium tracking-tight ">Pages</h1>
          </div>
          <div className="button mr-11">
            <button
              type="button"
              className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add New
            </button>
          </div>
          <div className="search_box_wrapper w-96">
            <div className="w-96">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <!-- Heroicon name: solid/search --> */}
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-96 pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-indigo-600 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row-2 flex flex-col px-20">
          <div className="first-column mt-8">
            <div className="pages_status_wrapper flex flex-row">
              <div className="border-r border-5 border-gray-300 px-1">
                <h3 className="text-xs text-indigo-600">All</h3>
              </div>
              <div className="border-r border-5 border-gray-300 px-1">
                <h3 className="text-xs text-gray-500">Draft</h3>
              </div>
              <div className="pl-1">
                <h3 className="text-xs text-gray-500">Published</h3>
              </div>
            </div>
            {/* ---------------------- */}
            <div className="second_colum flex flex-row mt-2">
              <div className="relative inline-block text-left">
                <div className="mr-2">
                  <button
                    onClick={dropdownClick}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-indigo-600 shadow-sm px-4 py-1 font-light bg-white text-sm  text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-x-500"
                    id="options-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    Bulk Action
                    {/* <!-- Heroicon name: solid/chevron-down --> */}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  className={`origin-top-right absolute right-0 ${
                    dropdown ? 'show' : 'hidden'
                  } mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu`}
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Action one
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Action two
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Action three
                    </a>
                  </div>
                </div>
              </div>
              <div className="apply_button">
                <button
                  type="button"
                  className="inline-flex items-center px-5 py-1 border border-transparent text-sm font-light rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="table_div_wrapper mt-7">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            <input type="checkbox" name="" id="" />
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            TITLE
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            AUTHOR
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            DATE AND TIME
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pages.map((el: any) => (
                          <tr
                            className={`${
                              count++ % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                            key={el.id}
                          >
                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              <input type="checkbox" name="" id="" />
                            </td>

                            <td className="px-6 py-2  whitespace-nowrap text-sm font-medium text-black">
                              <Link href={`/sites/${el.site}/pages/${el.id}`}>
                                {el.name}
                              </Link>
                            </td>
                            <td className="px-6 py-2 cursor-pointer whitespace-nowrap text-sm text-gray-500">
                              <Link href={`/sites/${el.site}/pages/${el.id}`}>
                                <span>
                                  <p>{`${el.createdBy.firstName} ${el.createdBy.lastName}`}</p>
                                  <p className="text-black text-xs">
                                    {el.createdBy.accountType}
                                  </p>
                                </span>
                              </Link>
                            </td>
                            <td className="px-6 py-2 cursor-pointer whitespace-nowrap text-sm  text-gray-500">
                              <Link href={`/sites/${el.site}/pages/${el.id}`}>
                                <span>
                                  <p>Published</p>
                                  <p>{moment(el.createdAt).format('llll')}</p>
                                </span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

  const pages = await client.query({
    query: PAGES_QUERY,
    variables: {
      filter: {
        combinedFilter: {
          logicalOperator: 'OR',
          filters: [
            {
              singleFilter: {
                field: 'siteId',
                operator: 'EQ',
                value: ctx.query.siteId,
              },
            },
            {
              singleFilter: {
                field: 'site',
                operator: 'EQ',
                value: ctx.query.siteId,
              },
            },
          ],
        },
      },
    },
  });

  return { props: { pages } };
}

export default withPageAuthRequired(Pages);
