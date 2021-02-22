import React from 'react';

import { Home } from '../../pages/index';
import { render } from '../testUtils';

describe('Home page', () => {
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <Home
        user={{
          nickname: 'nickname',
          name: 'name',
          picture: 'picture',
          sub: 'sub',
        }}
      />,
      {}
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
