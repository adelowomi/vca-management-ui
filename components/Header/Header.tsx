import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { Button } from '..';

const HeaderContaier = styled.div`
  height: 55px;
  padding: 0 16px;
  box-shadow: 0 1px 4px 0 #dfe5e9;
  background-color: #ffffff;
  position: absolute;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoutButton = styled(Button)`
  padding: 8px;
  height: unset;
  text-align: center;
`;

interface HeaderProps {
  user?: User;
}

export function Header({ user }: HeaderProps): JSX.Element {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <HeaderContaier>
      <Image
        src="/images/logo-colored-on-white.svg"
        alt="logo"
        width={126}
        height={35}
        loading="lazy"
      />
      {user && (
        <Link href="/api/logout">
          <LogoutButton aria-label={`${t('logout')}`} isLink width={'100px'}>
            {t('logout')}
          </LogoutButton>
        </Link>
      )}
    </HeaderContaier>
  );
}
