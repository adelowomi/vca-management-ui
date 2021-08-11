import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { FormInput } from '../../../../components/FormInput/formInput';
import Layout from '../../../../components/Layout/Layout';
import { MediaItemCard } from '../../../../components/MediaItem/MediaItemCard';
import { GqlErrorResponse } from '../../../../errors/GqlError';
import { GET_ALL_MEDIA } from '../../../../graphql/media/mutation';
import { PROFILE_QUERY } from '../../../../graphql/profile';
import { createApolloClient } from '../../../../lib/apollo';

export function ListMedia({ medias }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const page = parseInt(router.query?.page as string, 10) || 0;
  const currentPageUrl = router.asPath.split('?')[0];
  const nextPage = `${currentPageUrl}?search=${
    router.query?.search || ''
  }&page=${page + 1}`;
  const prevPage = `${currentPageUrl}?search=${
    router.query?.search || ''
  }&page=${page - 1 < 0 ? 0 : page - 1}`;
  const onSubmit = async (data) => {
    router.push({
      query: {
        search: data.search,
        page: 0,
      },
    });
  };

  return (
    <Layout>
      <div className="bg-vca-grey-7">
        <div className="max-w-7xl px-4 sm:p-6 md:p-8 bg-vca-grey-7 m-auto">
          <div className="flex flex-col">
            <div className="flex flex-row mb-8 justify-between ">
              <div className="flex flex-row">
                <div className="text-4xl font-bold">Media Gallery</div>
                <div className="flex flex-col justify-end ml-8 pb-2">
                  {/* <div>{`page ${router.query?.page}`}</div> */}
                </div>
              </div>
              <button
                type="submit"
                className="ml-6 bg-vca-blue h-12 text-white font-bold text-sm"
              >
                <div className="flex flex-row mx-8">
                  <Link href={`${currentPageUrl}/create`}>
                    <a className="mr-2">Add new</a>
                  </Link>
                </div>
              </button>
            </div>
            <form
              className="flex flex-row items-center"
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
                className="ml-6 bg-vca-blue h-12 text-white font-bold text-sm"
              >
                <div className="flex flex-row mx-8">
                  <div className="mr-2">Search</div>
                </div>
              </button>
            </form>
            <div className="mt-12 mx-auto grid gap-5 grid-cols-3 2xl:grid-cols-4 lg:max-w-none">
              {medias.map((media) => (
                <MediaItemCard
                  key={media.id}
                  media={media}
                  link={`${currentPageUrl}/${
                    media.id
                  }/${media.type.toLowerCase()}`}
                />
              ))}
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withPageAuthRequired(ListMedia);

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);
  let variables;

  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  const token = session.idToken;
  const client = createApolloClient(token);

  let page = 0;
  if (ctx.query.page) {
    page = ctx.query.page;
  }

  variables = {
    limit: 12,
    skip: 12 * page,
  };

  if (ctx.query.search) {
    variables = {
      limit: 12,
      skip: 12 * page,
      filter: {
        combinedFilter: {
          logicalOperator: 'OR',
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
                field: 'description',
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
    const profile = await client.query({
      query: PROFILE_QUERY,
    });
    variables['accountId'] = profile.data.getProfile.account.id;
    const mediaItems = await client.query({
      query: GET_ALL_MEDIA,
      variables,
    });
    return {
      props: {
        medias: mediaItems.data.medias,
        error: null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        medias: [],
        error: GqlErrorResponse(error),
      },
    };
  }
}
