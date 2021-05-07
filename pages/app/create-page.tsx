import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';

import CreatePage from '../../components/page/create/createPage';
import Dashboard from '../../layouts/Dashboard';

const AddPage = (props) => {
  const {
    sites: {
      data: { sites },
    },
  } = props;

  return (
    <Dashboard>
      <CreatePage siteId={sites[0].id} />
    </Dashboard>
  );
};

export default withPageAuthRequired(AddPage);
