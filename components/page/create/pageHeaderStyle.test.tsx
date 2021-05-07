import React from 'react';

import { fireEvent, render, screen } from '../../../test/testUtils';
import { PageHeaderStyle } from './PageHeaderStyle';

describe('PageHeaderStyle', () => {
  it('should render PageHeaderStyle snapshot', () => {
    const mockOnButtonClick = jest.fn();
    const { asFragment } = render(
      <PageHeaderStyle onButtonClick={mockOnButtonClick} state={{}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render PageHeaderStyle snapshot', () => {
    const mockOnButtonClick = jest.fn();
    render(<PageHeaderStyle onButtonClick={mockOnButtonClick} state={{}} />);
    fireEvent.click(screen.getByText('Header Type 1'));
    expect(mockOnButtonClick).toHaveBeenCalled();
  });
});
