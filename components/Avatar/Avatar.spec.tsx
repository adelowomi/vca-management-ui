import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

// Components
import Avatar from './Avatar';

describe('Avatar', () => {
  describe('render', () => {
    describe.each([
      ['Femi', 'Adeojo', 32, true],
      ['James', 'Bond', 32, false],
    ])(
      'with firstname %s lastname %s size %s and hasInitials %s set to',
      (firstName, lastName, size, hasInitials) => {
        it('render status of shipment', () => {
          const { container } = render(
            <Avatar
              firstName={firstName}
              lastName={lastName}
              size={size}
              hasInitials={hasInitials}
            />
          );
          expect(container.firstChild).toMatchSnapshot();
        });
      }
    );
  });

  describe('with props provided', () => {
    it('should set size based on size prop', () => {
      const { getByTestId } = render(
        <Avatar firstName="John" lastName="Doe" size={64} />
      );
      expect(getByTestId('avatar-test')).toHaveStyle({ width: '64px' });
    });

    it('should override class', () => {
      const { getByTestId } = render(
        <Avatar className="test" firstName="John" lastName="Doe" size={64} />
      );
      expect(getByTestId('avatar-test')).toHaveAttribute(
        'class',
        'relative test'
      );
    });

    it('should render initials based on firstName and lastName props', () => {
      const { getByText } = render(
        <Avatar className="test" firstName="John" lastName="Doe" size={64} />
      );
      expect(getByText('JD')).toBeInTheDocument();
    });
  });

  describe('when size < 24px', () => {
    it('should show single initial', () => {
      const { queryByText, queryByTestId } = render(
        <Avatar className="test" firstName="John" lastName="Doe" size={20} />
      );
      expect(queryByText('J')).toBeInTheDocument();
      expect(queryByTestId('initials-test').textContent.trim().length).toBe(1);
    });
  });

  describe('when size < 18px', () => {
    it('should not show initial', () => {
      const { queryByTestId } = render(
        <Avatar className="test" firstName="John" lastName="Doe" size={12} />
      );
      expect(queryByTestId('initials-test')).toBeNull();
    });
  });

  describe('when firstName prop is not passed', () => {
    it('should not render Avatar with initials', () => {
      const { queryByTestId } = render(<Avatar size={30} />);
      expect(queryByTestId('initials-test')).toHaveTextContent('');
    });
  });
});
