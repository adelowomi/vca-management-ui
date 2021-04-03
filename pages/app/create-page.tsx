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

  return (
    <Dashboard>
      <AddNewPage siteId={sites[0].id} />
    </Dashboard>
  );
};

export default withPageAuthRequired(CreatePage);
