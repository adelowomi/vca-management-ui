import { getSession, Session } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import * as React from 'react';
import styled from 'styled-components';

import { Button, Header } from '../components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

export const Home = ({ user }): JSX.Element => {
  const router = useRouter();

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

export async function getServerSideProps(ctx) {
  const session: Session = getSession(ctx.req, ctx.res);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }

  return { props: { user: session.user } };
}
export default Home;
