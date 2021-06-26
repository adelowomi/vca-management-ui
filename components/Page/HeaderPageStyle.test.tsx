import React from 'react';

import { fireEvent, render, screen } from '../../test/testUtils';
import { PageHeaderStyle } from './HeaderPageStyle';

const medias = [
  {
    __typename: 'Media',
    id: '60a465d7505c850015bfb114',
    type: 'IMAGE',
    name: 'media name',
    description: 'media description',
    document: null,
    video: null,
    image: {
      __typename: 'MediaImage',
      small:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/87/4936882cac4e578961a255d47456e4/floriane-vita-FyD3OWBuXnY-unsplash-1.png',
      medium:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/3c/ca8c227f9e49179262f195a2d2774d/floriane-vita-FyD3OWBuXnY-unsplash-1.png',
      large:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/e9/1fb74da6fe477494564bc850e3e80a/floriane-vita-FyD3OWBuXnY-unsplash-1.png',
      xLarge:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/85/5f727d97d14d28829f3f447e31a07a/floriane-vita-FyD3OWBuXnY-unsplash-1.png',
    },
  },
  {
    __typename: 'Media',
    id: '60a465d7505c850015bfb115',
    type: 'IMAGE',
    name: 'media name',
    description: 'media description',
    document: null,
    video: null,
    image: {
      __typename: 'MediaImage',
      small:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/87/4936882cac4e578961a255d47456e4/floriane-vita-FyD3OWBuXnY-unsplash-1.png',
      medium:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/3c/ca8c227f9e49179262f195a2d2774d/floriane-vita-FyD3OWBuXnY-unsplash-1.png',
      large:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/e9/1fb74da6fe477494564bc850e3e80a/floriane-vita-FyD3OWBuXnY-unsplash-1.png',
      xLarge:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/85/5f727d97d14d28829f3f447e31a07a/floriane-vita-FyD3OWBuXnY-unsplash-1.png',
    },
  },
];

describe('PageHeaderStyle', () => {
  it('should render PageHeaderStyle snapshot', () => {
    const mockOnButtonClick = jest.fn();
    const { asFragment } = render(
      <PageHeaderStyle
        state={{}}
        setState={jest.fn()}
        medias={medias}
        onButtonClick={mockOnButtonClick}
        headerType="headerTypeOne"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render PageHeaderStyle snapshot', () => {
    const mockOnButtonClick = jest.fn();
    render(
      <PageHeaderStyle
        state={{}}
        setState={jest.fn()}
        medias={medias}
        onButtonClick={mockOnButtonClick}
        headerType="headerTypeOne"
      />
    );
    fireEvent.click(screen.getByText('Header Type 1'));
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });
});
