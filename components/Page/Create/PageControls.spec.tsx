import React from 'react';

import { fireEvent, render, screen } from '../../../test/testUtils';
import { PageControls } from './PageControls';

describe('PageHeaderStyle', () => {
  it('should render PageHeaderStyle snapshot', () => {
    const mockOnButtonClick = jest.fn();
    const { asFragment } = render(
      <PageControls
        handleChange={mockOnButtonClick}
        onSubmit={mockOnButtonClick}
        title="hello"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render PageHeaderStyle snapshot', () => {
    const mockOnButtonClick = jest.fn();
    render(
      <PageControls
        handleChange={mockOnButtonClick}
        onSubmit={mockOnButtonClick}
        title="hello"
      />
    );
    fireEvent.click(screen.getByText('Header Type 1'));
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });
});
