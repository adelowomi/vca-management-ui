import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaEye, FaRegEdit } from 'react-icons/fa';
// import { EditIcon } from '../../../../components/AssetsSVG';
import Layout from '../../../../components/Layout/Layout';
import { GET_ALL_ITEMS_QUERY } from '../../../../graphql';
import { GET_PROFILE } from '../../../../graphql/site';
import { createApolloClient } from '../../../../lib/apollo';
import { useRouter } from 'next/router';
import { DELETE_ITEM } from '../../../../graphql/items.gql';
import DeleteModal from '../../../../components/utilsGroup/DeleteModal';
import { useToasts } from 'react-toast-notifications';
import { Post } from '../../../../services/postService';

const GqlErrorResponse = (error: any) => {
  return {
    error: {
      message: error.message,
      graphQLErrors: error.graphQLErrors,
      networkError: {
        // name: error.networkError.name,
        // statusCode: error.networkError.statusCode,
        // result: error.networkError.result,
      },
    },
  };
};

const posts = ({ error, posts, token }) => {
  const {
    query: { siteId },
  } = useRouter();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [id, setId] = React.useState(null);
  const { addToast } = useToasts();
  const client = createApolloClient(token);

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
        await client.mutate({
          mutation: DELETE_ITEM,
          variables: {
            itemId: id,
          },
        });
      }
      addToast('Post deleted successfully', { appearance: 'success' });
      pageReload();
      return;
    } catch (error) {
      addToast('An error occurred', { appearance: 'error' });
      return;
    }
  };
  return error ? (
    <p>An error occured while trying to load this page</p>
  ) : (
    <Layout>
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
              <Link href="/posts/create">Add new</Link>
            </button>
          </div>
        </section>
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
                        <tr className={`text-left  `} key={post.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600">
                            <input
                              type="checkbox"
                              className="px-3 h-5 w-6 border border-gray-300"
                              name=""
                              id=""
                            />
                          </td>

                          <td className="px-6 py-4 text-gray-500 line-clamp-3">
                            {post.featured}
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace-  text-gray-500">
                            {post.account.firstName}
                            {post.account.lastName}
                          </td>
                          <td className="px-6 py-4 text-gray-500 whitespace- ">
                            {post.draft}
                          </td>
                          <td className="px-6 py-4 text-gray-500 whitespace- ">
                            {moment(post.createdAt).format('llll')}
                          </td>
                          <td className="px-6 py-4 cursor-pointer whitespace- text-center text-gray-800">
                            <span className="flex space-x-3 text-gray-500">
                              {/* <span>edit</span> */}
                              <FaEye className="h-6" />
                              <Link
                                href={`/sites/${siteId}/posts/${post.id}/edit`}
                              >
                                <FaRegEdit className="h-6" />
                              </Link>
                              <RiDeleteBinLine
                                className="h-6"
                                onClick={() => getId(post.id)}
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
        </section>
      </div>
    </Layout>
  );
};

export default withPageAuthRequired(posts);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: Session = getSession(ctx.req, ctx.res);

  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return;
  }

  const client = createApolloClient(session.idToken);

  try {
    const {
      data: {
        getProfile: {
          account: { id: accountId },
        },
      },
    } = await client.query({
      query: GET_PROFILE,
    });

    const siteId = ctx.query.siteId as string;
    const postService = new Post(session.idToken);
    const { data: posts } = await postService.getPosts({ accountId, siteId });

    return {
      props: {
        accountId,
        token: session.idToken,
        error: null,
        user: session.user,
        posts,
      },
    };
  } catch (error) {
    return {
      props: {
        error: GqlErrorResponse(error),
        user: session.user,
      },
    };
  }
};
