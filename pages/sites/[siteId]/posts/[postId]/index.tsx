import { getSession } from '@auth0/nextjs-auth0';
import React from 'react';

const index = () => {
  return <div></div>;
};

export default index;
export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }

  return { props: { user: session.user } };
}
