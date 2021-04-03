import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';

import AddNewPage from '../../components/site/AddNewPage';
import Dashboard from '../../layouts/Dashboard';

const CreatePage = (props) => {
  const {
    sites: {
      data: { sites },
    },
  } = props;

<<<<<<< HEAD
  return (
    <Dashboard>
      <AddNewPage siteId={sites[0].id} />
=======
const CreatePage = (props) => {
  const site: any = useAppContext();
  const { data, error, loading } = useQuery(PAGES_QUERY, {
    variables: { siteId: site.id },
  });
  // console.log(site);
  // console.log('DATA', data);
  if (error) {
    console.error(error.message);
    console.error(error.graphQLErrors);
  }

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <Dashboard>
      <AddNewPage site={props.sites.data.sites[0].id} />
>>>>>>> 07bfe90a812512a6b5e40e9a391eddb741d481f2
    </Dashboard>
  );
};

export default withPageAuthRequired(CreatePage);
