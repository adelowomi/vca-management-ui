import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import Layout from '../../../../components/Layout/Layout';
import { ImageSelectBox } from '../../../../components/Page/PageStyledElements';
import { DraftEditor } from '../../../../components/utilsGroup/Editor';
// import { SelectMediaModal } from '../../../../components/utilsGroup/SelectMediaModal';
import { ADD_ITEM } from '../../../../graphql/items.gql';
import { GET_PROFILE } from '../../../../graphql/site';
import { convertToHTML } from '../../../../helpers/convertToHtml';
import { createApolloClient } from '../../../../lib/apollo';

const GqlErrorResponse = (error: any) => {
  return {
    error: {
      message: error.message,
      graphQLErrors: error.graphQLErrors,
      networkError: {
        name: error.networkError.name,
        statusCode: error.networkError.statusCode,
        result: error.networkError.result,
      },
    },
  };
};

const CreatePost = ({ token, accountId: account }) => {
  const client = createApolloClient(token);
  const [isLoading, setIsLoading] = React.useState(false);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    // setValue,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.content = convertToHTML(data.content);
    try {
      setIsLoading(true);
      await client.mutate({
        mutation: ADD_ITEM,
        variables: {
          createItemInput: {
            siteId: '60f59e49ec17e50015be5074',
            type: 'type',
            description: data.description,
            featured: data.postTitle,
            slug: '/slug',
            draft: 'false',
            content: data.content,
            category: 'general',
            account,
            tags: ['finance', 'banking'],
            media: '6101685f280c120015fec9a5',
            mediaUrl:
              'https://vca-documents.s3.ca-central-1.amazonaws.com/c9/85bd9336ea45f08631225a354b80ee/hero.png',
          },
        },
      });
      setIsLoading(false);
      addToast('Post is successfully created', { appearance: 'success' });
      return;
    } catch (error) {
      setIsLoading(false);
      addToast('Post could not be created!', { appearance: 'error' });
      return;
    }
  };

  // React.useEffect(() => {});
  return (
    <Layout>
      {/* <SelectMediaModal open={} setOpen={} medias={} state={} setState={} /> */}
      <div className="wrapper">
        <div className="px-24 mt-10">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <section className="flex items-center justify-between w-full h-">
              <div className="flex text-gray-600 items-center ml-3">
                <h1 className="text-3xl text-black font-bold">
                  Add a new post
                </h1>
              </div>
              <div className="flex space-x-3">
                <button className="text-gray-500 bg-gray-100 rounded-sm text-sm py-4 font-bold px-10 ">
                  Cancel
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
                    name="postTitle"
                    {...register('postTitle', { required: true })}
                    className="border border-gray-400 text-base flex text-left px-4 h-14 w-full  focus:outline-none"
                    placeholder="ex: Post title"
                  />

                  {errors?.postTitle && (
                    <p className="text-red-500">Post Title is required!</p>
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-6">Description</h4>
                  <input
                    type="text"
                    name="description"
                    {...register('description', { required: true })}
                    className="border border-gray-400 text-base flex text-left px-4 h-14 w-full  focus:outline-none"
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
                  <ImageSelectBox className="text-center h-14">
                    <p className="text-center ml-6">
                      + Select from media gallery
                    </p>
                  </ImageSelectBox>
                  {/* {errors?.name && (
                    <p className="text-red-500">name is required!</p>
                  )} */}
                </div>
              </div>
            </section>
            <section className="mt-6 grid grid-cols-3 h-full gap-4 items-center pb-10">
              <div className="col-span-2 h-full">
                <h4 className="text-xl font-medium mb-4">Post content</h4>
                <Controller
                  name="content"
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return <DraftEditor onChange={onChange} value={value} />;
                  }}
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

export default withPageAuthRequired(CreatePost);

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

    return {
      props: {
        accountId,
        token: session.idToken,
        error: null,
        user: session.user,
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
