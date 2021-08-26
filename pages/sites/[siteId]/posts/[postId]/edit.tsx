import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { Items } from '../../../../../classes/Items';
import {
  ComparisonOperatorEnum,
  LogicalOperatorEnum,
} from '../../../../../classes/schema';
import { User } from '../../../../../classes/User';
import { ErrorPage } from '../../../../../components/Errors/ErrorPage';
import Layout from '../../../../../components/Layout/Layout';
import { ShadowBtn } from '../../../../../components/Page/PageButtons';
import { ImageSelectBox } from '../../../../../components/Page/PageStyledElements';
import { getStringDate } from '../../../../../components/Page/PostList';
import { DraftEditor } from '../../../../../components/utilsGroup/Editor';
import { SelectMediaModal } from '../../../../../components/utilsGroup/SelectMediaModal';
import { TagSelector } from '../../../../../components/utilsGroup/TagSelector';
import { GqlErrorResponse } from '../../../../../errors/GqlError';
import { GET_ALL_MEDIA } from '../../../../../graphql';
import { EDIT_ITEM } from '../../../../../graphql/items.gql';
import { createApolloClient } from '../../../../../lib/apollo';

const edit = ({ token, post, medias, error }) => {
  const {
    query: { siteId, postId },
  } = useRouter();
  const [open, setOpen] = React.useState(false);
  const client = createApolloClient(token);
  const [isLoading, setIsLoading] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const { addToast } = useToasts();

  const [state, setState] = React.useState({
    mediaUrl: post[0]?.mediaUrl,
    media: post[0]?.media.id,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      featured: post[0]?.featured,
      description: post[0]?.description,
      media: post[0].media.id,
      content: post[0].content,
      tags: post[0].tags,
    },
  });

  const onSubmit = async (data) => {
    data.tags = data.tags ? data.tags : post[0].tags;
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

  const getContent = (content: any) => {
    setValue('content', content);
  };

  const getTags = (tags: any) => {
    setValue('tags', tags ? tags?.map((el) => el.value) : []);
  };

  React.useEffect(() => {
    register('content', {
      required: true,
    });
    register('media', {
      required: true,
    });
    register('tags', {
      required: false,
    });
    setState({
      ...state,
    });
  }, []);

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
                <div>
                  <h4 className="text-xl font-medium mb-6">Add Tags</h4>
                  <TagSelector getTags={getTags} defaultValue={post[0].tags} />
                  {errors?.tags && (
                    <p className="text-red-500">tags is required!</p>
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
            <hr className="border-gray-400 border-5 w-full mt-8" />
            <section className="preview-section mb-10">
              <div className="mt-5 space-x-3 flex flex-row btn-wrapper">
                <ShadowBtn
                  bg="primary"
                  type="button"
                  className="py-4 px-10 shadow-sm rounded text-sm font-bold cursor-pointer"
                  onClick={() => setPreview(!preview)}
                >
                  Show preview
                </ShadowBtn>
              </div>
              <>
                {preview ? (
                  <div className="mt-7">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="flex xl:w-card-xl lg:w-card- 2xl:w-card-2xl md:w-card-md rounded">
                        <div className="group w-full overflow-hidden hover:shadow-lg bg-white shadow-md">
                          <div className="h-44 w-full">
                            {state?.mediaUrl ? (
                              <img
                                className="w-full h-full object-cover rounded-tr rounded-tl"
                                src={state?.mediaUrl}
                                alt="news image"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-400 object-cover rounded-tr rounded-tl"></div>
                            )}
                          </div>
                          <div
                            className="px-3 py-4"
                            style={{ height: '200px' }}
                          >
                            <div className="font-semibold text-lg mb-2">
                              <a href={`#`}>{watch('featured')}</a>
                            </div>
                            <p className="text-gray-700 text-sm">
                              {watch('description')}
                            </p>
                          </div>
                          <button className="w-full bg-white text-gray-800 font-normal py-3 px-4 flex justify-left items-center text-xs italic rounded">
                            Created on: {getStringDate(new Date())}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </>
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
  const item = new Items(session.idToken);
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

    const posts = await (
      await item.getAllItems({
        accountId: profile.account.id,
        filter: {
          combinedFilter: {
            logicalOperator: LogicalOperatorEnum.And,
            filters: [
              {
                singleFilter: {
                  field: 'account',
                  operator: ComparisonOperatorEnum.Eq,
                  value: profile.account.id,
                },
              },
              {
                singleFilter: {
                  field: 'siteId',
                  operator: ComparisonOperatorEnum.Eq,
                  value: siteId,
                },
              },
            ],
          },
        },
      })
    ).data;

    const {
      data: { medias },
    } = await client.query({
      query: GET_ALL_MEDIA,
      variables: {
        accountId: profile.account.id,
        filter: {},
        limit: 100,
      },
    });

    return {
      props: {
        post: posts.filter((post) => post.id == postId) ?? [],
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
