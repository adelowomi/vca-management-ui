import { getSession } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import { Site } from '../../../../classes/Site';
import { User } from '../../../../classes/User';
import Layout from '../../../../components/Layout/Layout';
import DeleteModal from '../../../../components/utilsGroup/DeleteModal';
import { GqlErrorResponse } from '../../../../errors/GqlError';
import { PAGES_QUERY } from '../../../../graphql';
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
                        <Link
                          href={`/sites/${siteId}/pages/${el.id}/edit`}
                          key={el.id}
                        >
                          <tr
                            className={`text-left cursor-pointer hover:bg-vca-blue hover:bg-opacity-10`}
                            key={el.id}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600">
                              <input
                                type="checkbox"
                                className="px-3 h-5 w-6 border border-gray-300"
                                name=""
                                id=""
                              />
                            </td>

                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap ">
                              {el.name}
                            </td>
                            <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-500">
                              {el.menuItem
                                ? menuItems.filter(
                                    (item) => item.id === el.menuItem
                                  )[0].name
                                : ''}
                            </td>
                            <td className="px-6 py-4 cursor-pointer whitespace-nowrap text-gray-500">
                              <span>
                                <p>{moment(el.createdAt).format('llll')}</p>
                              </span>
                            </td>
                            <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-800">
                              <span className="flex space-x-5">
                                <Link
                                  href={`/sites/${siteId}/pages/${el.id}/edit`}
                                >
                                  <p>Edit</p>
                                </Link>
                                <RiDeleteBinLine
                                  onClick={() => getId(el.id)}
                                  className="h-6"
                                />
                              </span>
                            </td>
                          </tr>
                        </Link>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);
  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return {
      props: {
        pages: [],
        menuItems: [],
        token: null,
        error: null,
      },
    };
  }
  const user = new User(session.idToken);
  const site = new Site(session.idToken);

  const client = createApolloClient(session.idToken);
  try {
    const profile = await (await user.getProfile()).data;
    const currentSite = await (
      await site.getSite({
        accountId: profile.account.id,
        siteId: ctx.query.siteId as unknown as string,
      })
    ).data;

    const {
      data: {
        getProfile: {
          account: { id: account },
        },
      },
    } = await client.query({
      query: GET_PROFILE,
    });

    const { data } = await client.query({
      query: PAGES_QUERY,
      variables: {
        accountId: account,
        filter: {
          singleFilter: {
            field: 'site',
            operator: 'EQ',
            value: ctx.query.siteId,
          },
        },
      },
    });

    return {
      props: {
        pages: data.pages,
        menuItems: currentSite.header.menuItems,
        token: session.idToken,
        error: null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        pages: [],
        menuItems: [],
        token: null,
        error: GqlErrorResponse(error),
      },
    };
  }
};

export default withPageAuthRequired(Pages);
