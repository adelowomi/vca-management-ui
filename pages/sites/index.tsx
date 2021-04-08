import { gql } from '@apollo/client';
import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React from 'react';

import Layout from '../../layouts/Dashboard';
import { createApolloClient } from '../../lib/apollo';

const SITE_QUERY = gql`
  query Sites {
    sites {
      id
      name
      header {
        name
        type
        menuItems {
          id
          name
          slug
          description
        }
      }
    }
  }
`;

const Sites = (props) => {
  const {
    sites: {
      data: { sites },
    },
  } = props;
  let count = 0;

  return (
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

  const sites = await client.query({ query: SITE_QUERY });

  return { props: { sites } };
}

export default Sites;
