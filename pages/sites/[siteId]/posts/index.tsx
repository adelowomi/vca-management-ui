import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';

import { Items } from '../../../../classes/Items';
import {
  ComparisonOperatorEnum,
  LogicalOperatorEnum,
  Profile,
} from '../../../../classes/schema';
import { User } from '../../../../classes/User';
import { FormInput } from '../../../../components/FormInput/formInput';
import Layout from '../../../../components/Layout/Layout';
import DeleteModal from '../../../../components/utilsGroup/DeleteModal';
import { GqlErrorResponse } from '../../../../errors/GqlError';
import { GET_PROFILE } from '../../../../graphql/site';
import { createApolloClient } from '../../../../lib/apollo';
import { Post } from '../../../../services/postService';

const posts = ({
  error,
  posts,
  token,
  profile,
}: {
  error: any;
  posts: any;
  token: any;
  profile: Profile;
}) => {
  const {
    query: { siteId },
  } = useRouter();
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
  const { addToast } = useToasts();
  const _post = new Post(token);

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

  const pageReload = () => {
    router.replace(router.asPath);
  };

  const getId = (id: string) => {
    setOpen(!open);
    setId(id);
  };

  const handleIsdeleted = (check: boolean) => {
    setIsDeleted(check);
  };

  React.useEffect(() => {
    if (isDeleted) {
      onDelete();
    }
  }, [isDeleted]);

  const onDelete = async () => {
    try {
      if (id) {
        await _post.deletePost({ itemId: id });
      }
      addToast('Post deleted successfully', { appearance: 'success' });
      return pageReload();
    } catch (error) {
      addToast('An error occurred', { appearance: 'error' });
      return pageReload();
    }
  };
  return error ? (
    <p>An error occured while trying to load this page</p>
  ) : (
    <Layout profile={profile}>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        name="Post"
        handleIsdeleted={handleIsdeleted}
      />
      <div className="px-16 mt-10">
        <section className="flex items-center justify-between w-full h-">
          <div className="flex text-gray-600 items-center ml-3">
            <h1 className="text-3xl text-black font-bold">Posts</h1>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="text-white bg-vca-blue rounded-sm text-sm py-3 font-bold px-6"
            >
              <Link href={`/sites/${siteId}/posts/create`}>Add new</Link>
            </button>
          </div>
        </section>
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
            <div className="flex flex-row mx-8">
              <div className="mr-2">Search</div>
            </div>
          </button>
        </form>
        <section>
          <div className="flex flex-col mt-5">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle  min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200 overflow-auto">
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
                          Post title
                        </th>
                        <th scope="col" className="px-6 tracking-wider">
                          Author
                        </th>
                        <th scope="col" className="px-6 tracking-wider">
                          Draft
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
                      {posts.map((post: any) => (
                        <Link
                          href={`/sites/${siteId}/posts/${post.id}/edit`}
                          key={post.id}
                        >
                          <tr
                            className={`text-left hover:bg-vca-blue hover:bg-opacity-10 cursor-pointer `}
                            key={post.id}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600">
                              <input
                                type="checkbox"
                                className="px-3 h-5 w-6 border border-gray-300"
                                name=""
                                id=""
                              />
                            </td>

                            <td className="px-6 py-4 text-gray-500">
                              <p className="line-clamp-1 w-40">
                                {post.featured}
                              </p>
                            </td>
                            <td className="px-6 py-4 cursor-pointer whitespace-  text-gray-500">
                              {post.account.firstName}
                              {post.account.lastName}
                            </td>
                            <td className="px-6 py-4 text-gray-500 whitespace- ">
                              {post.draft ? 'TRUE' : 'FALSE'}
                            </td>
                            <td className="px-6 py-4 text-gray-500 whitespace- ">
                              {moment(post.createdAt).format('llll')}
                            </td>
                            <td className="px-6 py-4 cursor-pointer whitespace- text-center text-gray-800">
                              <span className="flex space-x-3 text-gray-500">
                                <Link
                                  href={`/sites/${siteId}/posts/${post.id}/edit`}
                                >
                                  Edit
                                </Link>
                                <RiDeleteBinLine
                                  className="h-6"
                                  onClick={() => getId(post.id)}
                                />
                              </span>
                            </td>
                          </tr>
                        </Link>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-9 flex flex-row justify-between">
                  <Link href={`${prevPage}`}>
                    <a className="flex flex-row">
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
                  {posts.length !== 0 ? (
                    <Link aria-label="Next" href={`${nextPage}`}>
                      <a className="flex flex-row">
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
        </section>
      </div>
    </Layout>
  );
};
export default withPageAuthRequired(posts);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: Session = getSession(ctx.req, ctx.res);
  const item = new Items(session.idToken);
  const client = createApolloClient(session.idToken);
  const user = new User(session.idToken);
  let page = 0;
  let variables;

  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return;
  }

  const profile = (await user.getProfile()).data;
  const {
    data: {
      getProfile: {
        account: { id: accountId },
      },
    },
  } = await client.query({
    query: GET_PROFILE,
  });
  if (ctx.query.page) {
    page = ctx.query.page as unknown as number;
  }

  variables = {
    limit: 10,
    offset: 10 * page,
    filter: {
      combinedFilter: {
        logicalOperator: LogicalOperatorEnum.And,
        filters: [
          {
            singleFilter: {
              field: 'account',
              operator: ComparisonOperatorEnum.Eq,
              value: accountId,
            },
          },
          {
            singleFilter: {
              field: 'siteId',
              operator: ComparisonOperatorEnum.Eq,
              value: ctx.query.siteId,
            },
          },
        ],
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
                field: 'account',
                operator: ComparisonOperatorEnum.Eq,
                value: accountId,
              },
            },
            {
              singleFilter: {
                field: 'siteId',
                operator: ComparisonOperatorEnum.Eq,
                value: ctx.query.siteId,
              },
            },
            {
              singleFilter: {
                field: 'featured',
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

  try {
    const posts = await (
      await item.getAllItems({
        accountId: accountId,
        ...variables,
      })
    ).data;

    return {
      props: {
        accountId,
        token: session.idToken,
        error: null,
        posts,
        profile,
      },
    };
  } catch (error) {
    return {
      props: {
        error: GqlErrorResponse(error),
        user: session.user,
        posts: [],
      },
    };
  }
};
