import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';

import Dashboard from '../../layouts/Dashboard';

const index = () => {
  return (
    <Dashboard>
      <h1 className="text-lg text-black text-">Component Dashboard</h1>
    </Dashboard>
  );
};
export default withPageAuthRequired(index);
