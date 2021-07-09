import { useMutation } from '@apollo/client';
import { getSession } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';

import { DeleteModal } from '../../../../../components/DeleteModal/DeleteModal';
import Layout from '../../../../../components/Layout/Layout';
import { REMOVE_MEDIA } from '../../../../../graphql/media/mutation';
import { GET_MEDIA } from '../../../../../graphql/media/query';
import { createApolloClient } from '../../../../../lib/apollo';

export default function DocumentView({ media, token }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const client = createApolloClient(token);
  const [removeMedia, { data, error }] = useMutation(REMOVE_MEDIA, { client });
  if (data) {
    router.back();
  }

  if (error) {
    console.error(error);
  }

  const deleteAction = async () => {
    try {
      await removeMedia({ variables: { mediaId: media.data.id } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        message={'Are you sure you want to delete this media item?'}
        deleteAction={deleteAction}
      />
      <div className="flex flex-col mx-10 mt-10">
        <div className="flex flex-row mb-8 justify-between ">
          <div className="flex flex-row">
            <div className="text-4xl font-bold">Document</div>
          </div>
          <div>
            <button
              type="submit"
              className="ml-6 bg-vca-grey-6 h-8 text-white font-bold text-sm"
              onClick={() => router.back()}
            >
              <div className="flex flex-row mx-8">
                <a className="mr-2 text-vca-grey-3 font-bold">Back</a>
              </div>
            </button>
            <button
              type="submit"
              className="ml-6 bg-vca-grey-6 h-8 text-white font-bold text-sm"
              onClick={() => {
                setOpen(true);
              }}
            >
              <div className="flex flex-row mx-8">
                <a className="mr-2 text-vca-grey-3 font-bold">Delete</a>
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <div className="font-semibold text-lg mb-4 mt-4 text-vca-grey-1">
              Name:
            </div>
            <div>{media.data.name}</div>
          </div>
          <div>
            <div className="font-semibold text-lg mb-4 mt-4 text-vca-grey-1">
              Description:
            </div>
            <div>{media.data.description}</div>
          </div>
          <div>
            <div className="font-semibold text-lg mb-4 mt-4 text-vca-grey-1">
              Url:
            </div>
            <a
              href={media.data.document.url}
              className="hover:text-vca-blue hover:font-semibold "
            >
              Document
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);
  const id = ctx.query.mediaId;

  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  const token = session.idToken;
  const client = createApolloClient(token);
  try {
    const mediaItem = await client.query({
      query: GET_MEDIA,
      variables: {
        filter: { singleFilter: { field: '_id', operator: 'EQ', value: id } },
      },
    });

    return {
      props: {
        token,
        media: { data: mediaItem.data.medias[0], error: null },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        token: null,
        media: { data: null, error },
      },
    };
  }
}
