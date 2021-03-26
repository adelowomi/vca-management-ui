import { gql, useQuery } from '@apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';

import { useAppContext } from '../../context/state';
import Dashboard from '../../layouts/Dashboard';

const PAGES_QUERY = gql`
  query Pages($siteId: String!) {
    pages(siteId: $siteId) {
      id
      name
      tags
      site
      hero {
        type
        mediaUrl
        heading
        hasAction
        actoinText
        actoinSlug
        location
      }
    }
  }
`;

const index = () => {
  const site: any = useAppContext();
  const { data, error, loading } = useQuery(PAGES_QUERY, {
    variables: { siteId: site.id },
  });
  console.log(site);
  console.log('DATA', data);
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
    </Dashboard>
  );
};
export default withPageAuthRequired(index);
// export default index;
