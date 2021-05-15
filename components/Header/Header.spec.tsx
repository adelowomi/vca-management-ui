import React from 'react';

import { render, screen } from '../../test/testUtils';
import { Header } from './Header';

test('matches snapshot', () => {
  const { asFragment } = render(<Header />);
  expect(asFragment()).toMatchSnapshot();
});

test('logout button', () => {
  const user = {
    nickname: 'string',
    name: 'string',
    picture: 'string',
    // eslint-disable-next-line @typescript-eslint/camelcase
    updated_at: 'string',
    sub: 'string',
  };
  render(<Header user={user} />);
  expect(screen.getByText(/logout/i)).toBeVisible();
});
