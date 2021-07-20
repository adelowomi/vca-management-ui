import 'jest-styled-components';

import React from 'react';

import { fireEvent, render, screen } from '../../test/testUtils';
import { PageControls } from './PageControls';

describe('PageHeaderStyle', () => {
  it('should render PageHeaderStyle snapshot', () => {
    const mockOnButtonClick = jest.fn();
    const { asFragment } = render(
      <PageControls
        siteId={'1234'}
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
        siteId={'1234'}
        onSubmit={mockOnButtonClick}
        title="hello"
      />
    );
    fireEvent.click(screen.getByText('Save & Publish'));
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });
});
