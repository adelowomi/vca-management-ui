import Link from 'next/link';
import * as React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { Button, Header } from '../components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  width: 220px;
  height: 100px;
  margin-bottom: 32px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
  justify-self: center;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: var(--dark-indigo);
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 32px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: italic;
  line-height: normal;
  letter-spacing: normal;
  color: var(--dark-indigo);
`;

const SignUpButton = styled.div`
  margin-left: 16px;
  font-weight: bold;
  font-style: normal;
  cursor: pointer;
`;

export const Login = function Login(): JSX.Element {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <Container>
      <Header />
      <LoginContainer>
        <TitleContainer>
          <Title>{t('loginHeader1')}</Title>
          <Title>{t('loginHeader2')}</Title>
        </TitleContainer>
        <Link href="/api/auth/login">
          <Button aria-label="Login Button" width={'345px'}>
            {t('loginCTA')}
          </Button>
        </Link>
        <SignUpContainer>
          <span>{t('notMember')}</span>
          <SignUpButton>
            <Link href="/signup">{t('signupCTA')}</Link>
          </SignUpButton>
        </SignUpContainer>
      </LoginContainer>
    </Container>
  );
};

export default Login;
