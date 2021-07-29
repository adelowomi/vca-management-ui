import { getSession, Session, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import styled from 'styled-components';

import { Button, Header } from '../components';
import { GqlErrorResponse } from '../errors/GqlError';
import { SITES_QUERY } from '../graphql';
import { createApolloClient } from '../lib/apollo';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

export const Home = ({
  user,
  sites,
}: {
  user: any;
  sites: any;
}): JSX.Element => {
  const router = useRouter();
  // eslint-disable-next-line no-console
  console.log(sites);

  if (user) {
    return (
      <Container>
        <Header user={user} />
        {user && <Button width={'345px'}>Signed in as {user.name}</Button>}
        <div>
          <h1>Index page</h1>
          <p>Current locale: {router?.locale}</p>
          <p>Default locale: {router?.defaultLocale}</p>
          <p>Configured locales: {JSON.stringify(router?.locales)}</p>
        </div>
      </Container>
    );
  }
  return <Container>Unauthenticated</Container>;
};
export default withPageAuthRequired(Home);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: Session = getSession(ctx.req, ctx.res);

  if (!session) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
    return;
  }

  const token = session.idToken;
  const client = createApolloClient(token);

  try {
    const sites = await client.query({
      query: SITES_QUERY,
      variables: {
        accountId: process.env.ACCOUNT_ID,
      },
    });
    return {
      props: {
        sites: sites.data.sites,
        error: null,
        user: session.user,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        sites: [],
        error: GqlErrorResponse(error),
        user: session.user,
      },
    };
  }
};
