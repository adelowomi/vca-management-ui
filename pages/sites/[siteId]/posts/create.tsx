import 'react-quill/dist/quill.snow.css';

import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import { useToasts } from 'react-toast-notifications';

import { Media } from '../../../../classes/schema';
import { User } from '../../../../classes/User';
import { ErrorPage } from '../../../../components/Errors/ErrorPage';
import Layout from '../../../../components/Layout/Layout';
import { ShadowBtn } from '../../../../components/Page/PageButtons';
import { ImageSelectBox } from '../../../../components/Page/PageStyledElements';
import { getStringDate } from '../../../../components/Page/PostList';
import SelectMediaModal from '../../../../components/Page/SelectMediaModal';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { TagSelector } from '../../../../components/utilsGroup/TagSelector';
import { GqlErrorResponse } from '../../../../errors/GqlError';
import { GET_ALL_MEDIA } from '../../../../graphql';
import { ADD_ITEM } from '../../../../graphql/items.gql';
import useUnsavedChangesWarning from '../../../../hooks/useUnsavedChangesWarning';
import { createApolloClient } from '../../../../lib/apollo';

const create = ({ token, accountId: account, error, profile }) => {
  const {
    query: { siteId },
    push,
  } = useRouter();

  const [open, setOpen] = React.useState(false);
  const client = createApolloClient(token);
  const [isLoading, setIsLoading] = React.useState(false);
  const { addToast } = useToasts();
  const [preview, setPreview] = React.useState(true);
  const [media, setMedia] = React.useState<Media>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
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
            draft: data.draft,
            content: data.content,
            category: 'general',
            account,
            tags: data.tags ? data.tags : [],
            media: data.media,
            mediaUrl: 'buhbhbibibii',
          },
        },
      });
      setIsLoading(false);
      addToast(
        `Post is successfully ${data.draft ? 'saved as draft.' : 'created'}`,
        { appearance: 'success' },
        () => push(`/sites/${siteId}/posts`)
      );
    } catch (error) {
      setIsLoading(false);
      addToast('Post could not be created!', { appearance: 'error' });
      return;
    }
  };
  const getTags = (tags: any) => {
    setValue('tags', tags ? tags.map((el) => el.value) : []);
  };

  const getQuillContent = (
    content: string,
    _delta: any,
    _source: any,
    _editor: any
  ) => {
    setValue('content', content);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'align',
    'color',
    'background',
    'link',
    'image',
    'video',
  ];

  React.useEffect(() => {
    register('media', {
      required: true,
    });
    register('tags');
    register('draft', {
      value: false,
    });
    register('content', {
      required: true,
    });
    if (media) {
      setValue('media', media.id);
    }
  }, [register, media]);

  if (error) {
    return <ErrorPage statusCode={400} />;
  }
  useUnsavedChangesWarning(isDirty);

  return (
    <Layout profile={profile}>
      <SelectMediaModal
        open={open}
        close={setOpen}
        profile={profile}
        selected={media}
        setMedia={setMedia}
        token={token}
      />
      <div className="wrapper">
        <div className="px-24 mt-10 pb-6">
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
                  onClick={() => setValue('draft', false)}
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
                <div>
                  <h4 className="text-xl font-medium mb-6">Add Tags</h4>
                  <TagSelector getTags={getTags} />
                </div>
              </div>
            </section>
            <section className="mt-6 grid grid-cols-3 h-full gap-12 items-center pb-10">
              <div className="col-span-2 h-full">
                <h4 className="text-xl font-medium mb-4">Post content</h4>
                <ReactQuill
                  theme="snow"
                  onChange={getQuillContent}
                  modules={modules}
                  formats={formats}
                />

                {errors?.content && (
                  <p className="text-red-500 text-sm mt-2">
                    content is required!
                  </p>
                )}
              </div>
              {preview ? (
                <div className="mt-3 col-span-1">
                  <div className="flex xl:w-card-xl lg:w-card- 2xl:w-card-2xl md:w-card-md rounded-sm w-3/4">
                    <div className="group w-full overflow-hidden hover:shadow-lg bg-white shadow-md">
                      <div className="h-44 w-full">
                        {media?.type == 'IMAGE' ? (
                          <img
                            className="w-full h-full object-cover"
                            src={media?.image?.small}
                            alt="news image"
                          />
                        ) : (
                          <ReactPlayer
                            url={media?.video.url}
                            className="h-full w-full"
                            height={'100%'}
                            width={'100%'}
                          />
                        )}
                      </div>
                      <div className="px-3 py-4" style={{ height: '200px' }}>
                        <div className="font-semibold text-lg mb-2">
                          <a href={`#`}>{watch('postTitle')}</a>
                        </div>
                        <p className="text-gray-700 text-sm">
                          {watch('description')}
                        </p>
                      </div>
                      <button
                        className="w-full 
                          bg-white 
                          text-gray-800 
                            font-normal 
                            py-3 px-4 
                            flex 
                            justify-left 
                            items-center 
                            text-xs 
                            italic rounded"
                      >
                        Created on: {getStringDate(new Date())}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </section>
            <section>
              <div className="flex justify-start space-x-6">
                <ShadowBtn
                  bg="secondary"
                  type="submit"
                  className="py-4 px-10 shadow-sm rounded text-sm font-bold cursor-pointer"
                  onClick={() => setValue('draft', true)}
                >
                  Save as draft
                </ShadowBtn>
                <ShadowBtn
                  bg="primary"
                  type="button"
                  className="py-4 px-10 shadow-sm rounded text-sm font-bold cursor-pointer"
                  onClick={() => setPreview(!preview)}
                >
                  {preview ? 'Hide preview' : 'Show preview'}
                </ShadowBtn>
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
        profile,
      },
    };
  } catch (error) {
    return {
      props: {
        error: GqlErrorResponse(error),
        user: session.user,
        medias: [],
        profile,
      },
    };
  }
};
