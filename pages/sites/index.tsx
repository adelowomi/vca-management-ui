import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React from 'react';

import Layout from '../../components/Layout/Layout';
import { SITES_QUERY } from '../../graphql/site';
import { createApolloClient } from '../../lib/apollo';

const Sites = ({ sites, error }) => {
  let count = 0;

  return error ? (
    <div>{error}</div>
  ) : (
    <Layout>
      <h1 className="text-lg">Welcome to all sites Sites</h1>
      {sites.map((el) => {
        return (
          <div className="text-blue-500" key={el.id}>
            <span className="pr-8 text-black">{++count}</span>
            <Link href={`/sites/${el.id}`}>
              <a>{el.name}</a>
            </Link>
          </div>
        );
      })}
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  const client = createApolloClient(session.idToken);

  try {
    const {
      data: { sites },
    } = await client.query({ query: SITES_QUERY });
    return { props: { sites } };
  } catch (error) {
    return { props: { error: 'Error loading........' } };
  }
}

export default Sites;
