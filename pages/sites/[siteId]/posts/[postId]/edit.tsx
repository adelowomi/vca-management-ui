import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { User } from '../../../../../classes/User';
import { ErrorPage } from '../../../../../components/Errors/ErrorPage';
import Layout from '../../../../../components/Layout/Layout';
import { ImageSelectBox } from '../../../../../components/Page/PageStyledElements';
import { DraftEditor } from '../../../../../components/utilsGroup/Editor';
import { SelectMediaModal } from '../../../../../components/utilsGroup/SelectMediaModal';
import { GqlErrorResponse } from '../../../../../errors/GqlError';
import { GET_ALL_MEDIA } from '../../../../../graphql';
import { EDIT_ITEM } from '../../../../../graphql/items.gql';
import { createApolloClient } from '../../../../../lib/apollo';
import { Post } from '../../../../../services/postService';

const edit = ({ token, post, medias, error }) => {
  const {
    query: { siteId, postId },
  } = useRouter();
  const [open, setOpen] = React.useState(false);
  const client = createApolloClient(token);
  const [isLoading, setIsLoading] = React.useState(false);
  const { addToast } = useToasts();
  const [state, setState] = React.useState({
    mediaUrl: '',
    media: '',
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      featured: post[0]?.featured,
      description: post[0]?.description,
      media: post[0]?.media.id,
      content: post[0].content,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await client.mutate({
        mutation: EDIT_ITEM,
        variables: {
          updateItemInput: {
            ...data,
          },
          itemId: postId,
        },
      });
      setIsLoading(false);
      addToast('Post is successfully Edited.', { appearance: 'success' });
      return;
    } catch (error) {
      setIsLoading(false);
      addToast('Post could not be Edited.', { appearance: 'error' });
      return;
    }
  };

  const getContent = (content) => {
    setValue('content', content);
  };

  React.useEffect(() => {
    register('content', {
      required: true,
    });
    register('media', {
      required: true,
    });
  });
  if (error) {
    return <ErrorPage statusCode={500} />;
  }
  return (
    <Layout>
      <SelectMediaModal
        open={open}
        setOpen={setOpen}
        medias={medias}
        state={state}
        setState={setState}
      />
      <div className="wrapper">
        <div className="px-24 mt-10">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <section className="flex items-center justify-between w-full h-">
              <div className="flex text-gray-600 items-center ml-3">
                <h1 className="text-3xl text-black font-bold">Edit post</h1>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="text-gray-500 bg-gray-100 rounded-sm text-sm py-4 font-bold px-10 "
                >
                  <Link href={`/sites/${siteId}/posts`}>Cancel</Link>
                </button>
                <button
                  type="submit"
                  className="text-white bg-vca-blue rounded-sm text-sm py-4 font-bold px-10"
                >
                  {isLoading ? 'Saving...' : 'Publish'}
                </button>
              </div>
            </section>

            <section className="mt-10">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <h4 className="text-xl font-medium mb-6">Post title</h4>

                  <input
                    type="text"
                    {...register('featured', { required: true })}
                    className={`border ${
                      errors.featured ? 'border-red-500' : 'border-gray-400'
                    } text-base flex text-left px-4 h-14 w-full  focus:outline-none`}
                    placeholder="ex: Post title"
                  />

                  {errors?.featured && (
                    <p className="text-red-500">Post Title is required!</p>
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-6">Description</h4>
                  <input
                    type="text"
                    name="description"
                    {...register('description', { required: true })}
                    className={`border ${
                      errors.description ? 'border-red-500' : 'border-gray-400'
                    } text-base flex text-left px-4 h-14 w-full  focus:outline-none`}
                    placeholder="ex: Description"
                  />

                  {errors?.description && (
                    <p className="text-red-500">description is required!</p>
                  )}
                </div>
              </div>
            </section>
            <section className="mt-10">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <h4 className="text-xl font-medium mb-6">Add Media</h4>
                  <ImageSelectBox
                    className="text-center h-14 cursor-pointer"
                    onClick={() => setOpen(!open)}
                  >
                    <p className="text-center ml-6">
                      + Select from media gallery
                    </p>
                  </ImageSelectBox>
                  {errors?.media && (
                    <p className="text-red-500">media is required!</p>
                  )}
                </div>
              </div>
            </section>
            <section className="mt-6 grid grid-cols-3 h-full gap-4 items-center pb-10">
              <div className="col-span-2 h-full">
                <h4 className="text-xl font-medium mb-4">Post content</h4>
                <DraftEditor
                  defaultValue={post[0].content}
                  getContent={getContent}
                />
                {errors?.content && (
                  <p className="text-red-500">content is required!</p>
                )}
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default withPageAuthRequired(edit);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: Session = getSession(ctx.req, ctx.res);

  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return;
  }
  const user = new User(session.idToken);
  const profile = (await user.getProfile())?.data;
  const client = createApolloClient(session.idToken);

  try {
    const { siteId, postId } = ctx.query;

    const postService = new Post(session.idToken);
    const { data: posts } = await postService.getPost({
      accountId: profile.account.id,
      siteId,
      postId,
    });

    const {
      data: { medias },
    } = await client.query({
      query: GET_ALL_MEDIA,
      variables: {
        accountId: profile.account.id,
        filter: {},
      },
    });

    return {
      props: {
        post: posts ?? [],
        token: session.idToken,
        error: null,
        user: session.user,
        medias: medias ?? [],
      },
    };
  } catch (error) {
    return {
      props: {
        error: GqlErrorResponse(error),
        user: session.user,
        post: [],
        medias: [],
      },
    };
  }
};
