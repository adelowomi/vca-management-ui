import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import Layout from '../../../../components/Layout/Layout';
import { MediaItemCard } from '../../../../components/MediaItem/MediaItemCard';
import { GET_ALL_MEDIA } from '../../../../graphql/media/mutation';
import { createApolloClient } from '../../../../lib/apollo';

export function ListMedia({ medias }) {
  const router = useRouter();
  const page = parseInt(router.query?.page as string, 10) || 0;
  const nextPage = `${router.asPath.split('?')[0]}?page=${page + 1}`;
  const prevPage = `${router.asPath.split('?')[0]}?page=${
    page - 1 < 0 ? 0 : page - 1
  }`;
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="mt-12 mx-auto grid gap-5 grid-cols-3 xl:grid-cols-4 lg:max-w-none">
          {medias.map((media) => (
            <MediaItemCard key={media.id} media={media} />
          ))}
        </div>
        <div className="mt-9 flex flex-row justify-between">
          <Link aria-label="Previous" href={`${prevPage}`}>
            <React.Fragment>
              <div className="mt-4 flex flex-row">
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
            </React.Fragment>
          </Link>
          <Link aria-label="Next" href={`${nextPage}`}>
            <React.Fragment>
              <div className="mr-2 mt-4 flex flex-row">Next</div>
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
            </React.Fragment>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default withPageAuthRequired(ListMedia);

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);

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
  try {
    const mediaItems = await client.query({
      query: GET_ALL_MEDIA,
      variables: {
        limit: 12,
        skip: 12 * page,
      },
    });
    return {
      props: {
        medias: mediaItems.data.medias,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
