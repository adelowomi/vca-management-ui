import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

import Spinner, { SpinnerSizeTypes } from './Spinner';

describe('<Spinner />', () => {
  const sizes: SpinnerSizeTypes[] = ['small', 'medium', 'large'];
  describe.each([sizes])('Given default (%s) size spinner', (size) => {
    const { container } = render(<Spinner size={size} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Given progress is set', () => {
    const { container, getByTestId } = render(
      <Spinner progress={10} size="small" />
    );
    expect(container.firstChild).toMatchSnapshot();
    it('then progress is correctly represented', () => {
      expect(getByTestId('small-10')).toBeTruthy();
    });
  });

  describe('Given progress is not set', () => {
    it('then progress is correctly represented', () => {
      const { queryByTestId } = render(<Spinner />);
      expect(queryByTestId('small-10')).toBeFalsy();
    });
  });
});
