import { getSession } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import Layout from '../../../../components/Layout/Layout';
import { BulkActionDropdown } from '../../../../components/Page/BulkActionDropdown';
import DeleteModal from '../../../../components/utilsGroup/DeleteModal';
import { GET_SITE_MENUITEMS, PAGES_QUERY } from '../../../../graphql';
import { DELETE_PAGE } from '../../../../graphql/pages';
import { GET_PROFILE } from '../../../../graphql/site';
import { createApolloClient } from '../../../../lib/apollo';

const PageActionsWrapper = tw.div`
flex
flex-col
`;

const PageActionsColOne = tw.div`
flex
flex-row
justify-between
items-center
`;

const Btn = styled.button`
  background-color: #1890ff;
  border-radius: 4px;
  box-shadow: rgba(128, 128, 128, 0.1);
`;

export const PageActionsColOneBtn = tw(Btn)`
text-white
text-sm
py-3
font-bold
px-7
`;

const PageTableWrapper = tw.div``;
const PageHeroWrapper = styled.div`
  padding: 10px 50px;
  background: linear-gradient(
      0deg,
      rgba(24, 144, 255, 0.1),
      rgba(24, 144, 255, 0.1)
    ),
    linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 2px;
`;

const P = tw.p`
  text-lg
  text-gray-800
  font-normal
  text-left
`;

const Pages = ({ pages, menuItems, token }) => {
  const {
    query: { siteId },
  } = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [id, setId] = React.useState(null);
  const client = createApolloClient(token);

  const getId = (id: string) => {
    setOpen(!open);
    setId(id);
  };

  const handleIsdeleted = (check: boolean) => {
    setIsDeleted(check);
  };

  React.useEffect(() => {
    onDelete();
  }, [isDeleted]);

  const onDelete = async () => {
    try {
      if (id) {
        await client.mutate({
          mutation: DELETE_PAGE,
          variables: {
            pageId: id,
          },
        });
        Router.reload();
      }
      return;
    } catch (error) {
      return;
    }
  };

  return (
    <Layout>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        name="Page"
        handleIsdeleted={handleIsdeleted}
      />
      <div className="px-10 mt-6">
        <PageActionsWrapper>
          <PageActionsColOne>
            <h1 className="text-4xl font-semibold">Pages</h1>
            <PageActionsColOneBtn className="focus:outline-none">
              <Link href={`/sites/${siteId}/pages/create`}> Add New</Link>
            </PageActionsColOneBtn>
          </PageActionsColOne>
          <div className=" flex mt-7">
            <BulkActionDropdown />
          </div>
        </PageActionsWrapper>
        <PageHeroWrapper className="flex flex-row justify-between mt-6 py-20 w0-full items-center">
          <div className="second_col w-full">
            <img src="/images/hero.png" alt="hero picture" />
          </div>

          <div className="flex flex-col justify-items-center w-full px-">
            <div className="header_text mt-5 ">
              <h3 className="px- text-xl text-gray-900 font-semibold">
                Pages are layout types that are divided into 3 main sections:
              </h3>
            </div>
            <div className="body_text px- mt-5 mb-5">
              <P>1. A hero</P>
              <P>2. Widget slider</P>
              <P>3. Post section that includes cards</P>
            </div>
          </div>
          <div className="w-full ">
            <PageActionsColOneBtn className="ml-36">
              Got it
            </PageActionsColOneBtn>
          </div>
        </PageHeroWrapper>
        <PageTableWrapper>
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
                          Page Title
                        </th>
                        <th scope="col" className="px-6 tracking-wider">
                          Menu Items
                        </th>
                        <th scope="col" className="px-6 tracking-wider">
                          Last posted on
                        </th>
                        <th scope="col" className="px-6  tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pages.map((el: any) => (
                        <tr className={`text-left  `} key={el.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600">
                            <input
                              type="checkbox"
                              className="px-3 h-5 w-6 border border-gray-300"
                              name=""
                              id=""
                            />
                          </td>

                          <td className="px-6 py-4 text-gray-500 whitespace-nowrap ">
                            <Link href={`/sites/${el.site}/pages/${el.id}`}>
                              {el.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-500">
                            <Link href={`/sites/${el.site}/pages/${el.id}`}>
                              {el.menuItem
                                ? menuItems.filter(
                                    (item) => item.id === el.menuItem
                                  )[0].name
                                : ''}
                            </Link>
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace-nowrap text-gray-500">
                            <Link href={`/sites/${el.site}/pages/${el.id}`}>
                              <span>
                                <p>{moment(el.createdAt).format('llll')}</p>
                              </span>
                            </Link>
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-800">
                            <span className="flex space-x-5">
                              <Link
                                href={`/sites/${siteId}/pages/${el.id}/edit`}
                              >
                                <p>edit</p>
                              </Link>

                              <RiDeleteBinLine
                                onClick={() => getId(el.id)}
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
        </PageTableWrapper>
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
  let menuItems: any;
  let pages: any;
  let accountId: any;

  try {
    const {
      data: {
        getProfile: {
          account: { id: account },
        },
      },
    } = await client.query({
      query: GET_PROFILE,
    });
    accountId = account;
  } catch (error) {
    accountId = { error: true };
  }

  try {
    const { data } = await client.query({
      query: PAGES_QUERY,
      variables: {
        accountId,
        filter: {
          combinedFilter: {
            filters: [
              {
                singleFilter: {
                  field: 'siteId',
                  operator: 'EQ',
                  value: ctx.query.siteId,
                },
              },
            ],
          },
        },
      },
    });

    pages = data.pages;
  } catch (error) {
    pages = { error: true };
  }

  try {
    const {
      data: {
        siteMenuItems: { header },
      },
    } = await client.query({
      query: GET_SITE_MENUITEMS,
      variables: {
        filter: {
          combinedFilter: {
            filters: [
              {
                singleFilter: {
                  field: 'siteId',
                  operator: 'EQ',
                  value: ctx.query.siteId,
                },
              },
            ],
          },
        },
      },
    });
    menuItems = header.menuItems;
  } catch (error) {
    menuItems = { error: true };
  }

  return { props: { pages, menuItems, token: session.idToken } };
}

export default withPageAuthRequired(Pages);
