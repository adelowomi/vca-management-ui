import { gql, useQuery } from '@apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React from 'react';

import Dashboard from '../../layouts/Dashboard';

const SITES_QUERY = gql`
  query Sites {
    sites {
      name
      id
      createdBy {
        businessName
        firstName
        lastName
        phone
        industry
      }
    }
  }
`;

const index = () => {
  const { data, error, loading } = useQuery(SITES_QUERY);
  console.log('DATA', data);
  if (error) {
    console.log('ERROR', error.message);
    console.log('ERROR GRAPH', error.graphQLErrors);
  }
  console.log('LOADING', loading);

  return (
    <Dashboard>
      <h1 className="text-lg text-black text-">Component Dashboard</h1>
      {data && (
        <>
          {data.feed.links.map((link) => (
            <Link key={link.id} href={`/${link.name}`} />
          ))}
        </>
      )}
    </Dashboard>
  );
};
// export default withPageAuthRequired(index);
export default index;
