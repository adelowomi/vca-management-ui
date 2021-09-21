import { getSession } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import { PerformanceClass } from '../../../../classes/Performance';
import { LogicalOperatorEnum } from '../../../../classes/schema';
import { Site } from '../../../../classes/Site';
import { User } from '../../../../classes/User';
import { FormInput } from '../../../../components/FormInput/formInput';
import Layout from '../../../../components/Layout/Layout';
import DeleteModal from '../../../../components/utilsGroup/DeleteModal';
import { DELETE_PERFORMANCE } from '../../../../graphql/performance.gql';
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

const PageActionsColOneBtn = tw(Btn)`
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

const index = ({ performances, menuItems, token, profile }) => {
  const router = useRouter();
  const page = parseInt(router.query?.page as string, 10) || 0;
  const currentPageUrl = router.asPath.split('?')[0];
  const nextPage = `${currentPageUrl}?search=${
    router.query?.search || ''
  }&page=${page + 1}`;
  const prevPage = `${currentPageUrl}?search=${
    router.query?.search || ''
  }&page=${page - 1 < 0 ? 0 : page - 1}`;
  const [open, setOpen] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [id, setId] = React.useState(null);
  const client = createApolloClient(token);

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

  const {
    query: { siteId },
  } = useRouter();

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
          mutation: DELETE_PERFORMANCE,
          variables: {
            performanceId: id,
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
    <Layout profile={profile}>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        name="Performance"
        handleIsdeleted={handleIsdeleted}
      />
      <div className="wrapper mt-6 px-10">
        <PageActionsWrapper>
          <PageActionsColOne>
            <h1 className="text-4xl font-semibold">Performance</h1>
            <Link href={`/sites/${siteId}/performance/create`}>
              <PageActionsColOneBtn className="focus:outline-none">
                {' '}
                Add New
              </PageActionsColOneBtn>
            </Link>
          </PageActionsColOne>
        </PageActionsWrapper>
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
        <PageHeroWrapper className="flex flex-row justify-between mt-6 py-20 w0-full items-center">
          <div className="second_col w-full">
            <img src="/images/hero.png" alt="hero picture" />
          </div>

          <div className="flex flex-col justify-items-center w-full px-">
            <div className="header_text mt-5 ">
              <h3 className="px- text-xl text-gray-900 font-semibold">
                Performance is a layout type that are divided into 2 main
                sections:
              </h3>
            </div>
            <div className="body_text px- mt-5 mb-5 text-base">
              <P>1. A hero & your NASDAQ ID </P>
              <P>2. Your quarters</P>
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
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {performances.map((performance: any) => (
                        <tr
                          className={`text-left hover:bg-vca-blue hover:bg-opacity-10 cursor-pointer `}
                          key={performance.id}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600">
                            <input
                              type="checkbox"
                              className="px-3 h-5 w-6 border border-gray-300"
                              name=""
                              id=""
                            />
                          </td>

                          <Link
                            href={`/sites/${siteId}/performance/${performance.id}/edit`}
                            key={performance.id}
                          >
                            <>
                              <Link
                                href={`/sites/${siteId}/performance/${performance.id}/edit`}
                              >
                                <td className="px-6 py-4 text-gray-500 whitespace-nowrap ">
                                  {performance.name}
                                </td>
                              </Link>
                              <Link
                                href={`/sites/${siteId}/performance/${performance.id}/edit`}
                              >
                                <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-500">
                                  {performance.menuItem
                                    ? menuItems.filter(
                                        (item) =>
                                          item.id === performance.menuItem
                                      )[0].name
                                    : ''}
                                </td>
                              </Link>
                              <Link
                                href={`/sites/${siteId}/performance/${performance.id}edit`}
                              >
                                <td className="px-6 py-4 cursor-pointer whitespace-nowrap text-gray-500">
                                  <span>
                                    <p>{performance.createdAt}</p>
                                  </span>
                                </td>
                              </Link>
                            </>
                          </Link>
                          <td className="px-6 py-4 cursor-pointer whitespace-nowrap  text-gray-800">
                            <span className="flex space-x-5">
                              <Link
                                href={`/sites/${siteId}/performance/${performance.id}/edit`}
                              >
                                <p>Edit</p>
                              </Link>

                              <RiDeleteBinLine
                                onClick={() => getId(performance.id)}
                                className="h-6"
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
  const site = new Site(session.idToken);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  let page = 0;
  let variables;

  if (ctx.query.page) {
    page = ctx.query.page as unknown as number;
  }

  variables = {
    limit: 10,
    skip: 10 * page,
    filter: {
      singleFilter: {
        field: 'site',
        operator: 'EQ',
        value: ctx.query.siteId,
      },
    },
  };

  if (ctx.query.search) {
    variables = {
      ...variables,
      filter: {
        combinedFilter: {
          logicalOperator: LogicalOperatorEnum.And,
          filters: [
            {
              singleFilter: {
                field: 'name',
                operator: 'REGEX',
                value: ctx.query.search ? ctx.query.search : '',
                options: 'i',
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
    };
  }
  const user = new User(session.idToken);

  const profile = (await user.getProfile()).data;
  const currentSite = await (
    await site.getSite({
      siteId: ctx.query.siteId as unknown as string,
      accountId: profile.account.id,
    })
  ).data;

  const _thisPerformance = new PerformanceClass(session.idToken);
  let performances: any;
  let menuItems: any;
  try {
    const { data } = await _thisPerformance.getAllBySite({
      accountId: profile.account.id,
      ...variables,
    });

    performances = data ? data : { error: true };
  } catch (error) {
    performances = { error: true };
  }

  try {
    menuItems = currentSite.header.menuItems
      ? currentSite.header.menuItems
      : { error: true };
  } catch (error) {
    menuItems = { error: true };
  }

  return {
    props: { performances, menuItems, token: session.idToken, profile },
  };
}

export default withPageAuthRequired(index);
