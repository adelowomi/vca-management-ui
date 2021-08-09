import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { User } from '../../../../classes/User';
import { ErrorPage } from '../../../../components/Errors/ErrorPage';
import Layout from '../../../../components/Layout/Layout';
import { ImageSelectBox } from '../../../../components/Page/PageStyledElements';
import { DraftEditor } from '../../../../components/utilsGroup/Editor';
import { SelectMediaModal } from '../../../../components/utilsGroup/SelectMediaModal';
import { GqlErrorResponse } from '../../../../errors/GqlError';
import { GET_ALL_MEDIA } from '../../../../graphql';
import { ADD_ITEM } from '../../../../graphql/items.gql';
import { createApolloClient } from '../../../../lib/apollo';

const create = ({ token, accountId: account, medias, error }) => {
  const {
    query: { siteId },
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
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      await client.mutate({
        mutation: ADD_ITEM,
        variables: {
          createItemInput: {
            siteId: siteId,
            type: 'type',
            description: data.description,
            featured: data.postTitle,
            slug: '/slug',
            draft: 'false',
            content: data.content,
            category: 'general',
            account,
            tags: ['finance', 'banking'],
            media: data.media,
            mediaUrl: state.mediaUrl,
          },
        },
      });
      setIsLoading(false);
      addToast('Post is successfully created', { appearance: 'success' });
      return router.push(`/sites/${siteId}/posts`);
    } catch (error) {
      setIsLoading(false);
      addToast('Post could not be created!', { appearance: 'error' });
      return;
    }
  };

  React.useEffect(() => {
    register('media', {
      required: true,
    });
    register('content', {
      required: true,
    });
    if (state.media) {
      setValue('media', state.media);
    }
  }, [register, state.media]);
  const getContent = (content) => {
    setValue('content', content);
  };
  if (error) {
    return <ErrorPage statusCode={400} />;
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
              <div className="flex text-gray-600 items-center">
                <h1 className="text-3xl text-black font-bold">
                  Add a new post
                </h1>
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
              <div className="grid grid-cols-3 gap-4 items-center content-center">
                <div>
                  <h4 className="text-xl font-medium mb-6">Post title</h4>

                  <input
                    type="text"
                    name="postTitle"
                    {...register('postTitle', { required: true })}
                    className={`border ${
                      errors.postTitle ? 'border-red-500' : 'border-gray-400'
                    } text-base flex text-left px-4 h-14 w-full  focus:outline-none`}
                    placeholder="ex: Post title"
                  />

                  {errors?.postTitle && (
                    <p className="text-red-500 text-sm mt-2">
                      Post Title is required!
                    </p>
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
                    <p className="text-red-500 text-sm mt-2">
                      description is required!
                    </p>
                  )}
                </div>
              </div>
            </section>
            <section className="mt-10">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <h4 className="text-xl font-medium mb-6">Add Media</h4>
                  <ImageSelectBox
                    className="text-center h-14 cursor-pointer "
                    onClick={() => setOpen(!open)}
                  >
                    <p className="text-center ml-6">
                      + Select from media gallery
                    </p>
                  </ImageSelectBox>
                  {errors?.media && (
                    <p className="text-red-500 text-sm mt-2">
                      media is required!
                    </p>
                  )}
                </div>
              </div>
            </section>
            <section className="mt-6 grid grid-cols-3 h-full gap-4 items-center pb-10">
              <div className="col-span-2 h-full">
                <h4 className="text-xl font-medium mb-4">Post content</h4>
                <DraftEditor getContent={getContent} error={errors.content} />

                {errors?.content && (
                  <p className="text-red-500 text-sm mt-2">
                    content is required!
                  </p>
                )}
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default withPageAuthRequired(create);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: Session = getSession(ctx.req, ctx.res);
  const client = createApolloClient(session?.idToken);
  const user = new User(session.idToken);
  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    // return;
  }

  const profile = (await user.getProfile()).data;

  try {
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
        accountId: profile.account.id,
        token: session.idToken,
        error: null,
        user: session.user,
        medias,
      },
    };
  } catch (error) {
    return {
      props: {
        error: GqlErrorResponse(error),
        user: session.user,
        medias: [],
      },
    };
  }
};