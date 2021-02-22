import React from 'react';

import { Login } from '../../pages/login';
import { render, screen } from '../testUtils';

describe('Login page', () => {
  test('matches snapshot', async () => {
    const { asFragment } = render(<Login />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  test('Sign in button', async () => {
    render(<Login />, {});
    expect(screen.getByRole('button')).toHaveTextContent('Sign In');
  });
});
