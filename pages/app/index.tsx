import { useQuery } from '@apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';

import { useAppContext } from '../../context/state';
import { PAGES_QUERY } from '../../graphql/schema';
import Dashboard from '../../layouts/Dashboard';

const index = () => {
  const site: any = useAppContext();
  const { data, error, loading } = useQuery(PAGES_QUERY, {
    variables: { siteId: site.id },
  });
  if (error) {
    console.error(error.message);
    console.error(error.graphQLErrors);
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Dashboard>
      <h1 className="text-lg text-black text-">Component Dashboard</h1>
      {JSON.stringify(data)}
    </Dashboard>
  );
};
export default withPageAuthRequired(index);
