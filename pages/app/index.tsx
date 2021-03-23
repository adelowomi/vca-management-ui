import { getSession } from '@auth0/nextjs-auth0';
import React from 'react';

import Dashboard from '../../layouts/Dashboard';

const index = () => {
  return (
    <Dashboard>
      <h1 className="text-lg text-black text-">Component Dashboard</h1>
    </Dashboard>
  );
};
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx.req, ctx.res);
  if (!session) {
    return { redirect: { destination: '/login' } };
  }
  return { props: {} };
}
export default index;
