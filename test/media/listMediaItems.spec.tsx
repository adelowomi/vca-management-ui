import 'jest-styled-components';

import { MockedProvider } from '@apollo/client/testing';
import { UserProvider } from '@auth0/nextjs-auth0';
import { BaseProvider, LightTheme } from 'baseui';
import React from 'react';
import { IntlProvider } from 'react-intl';

import * as locales from '../../content/locale';
import { ListMedia } from '../../pages/sites/[siteId]/media/index';
import { render, screen } from '../testUtils';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

const medias = [
  {
    __typename: 'Media',
    id: '60b55eb114367a001512fb2f',
    createdAt: '2021-05-31T22:09:53.351Z',
    updatedAt: '2021-05-31T22:09:53.351Z',
    name: 'Animation',
    description: 'Animation description',
    type: 'VIDEO',
    document: null,
    video: 'https://www.youtube.com/watch?v=5gJONXzaA0M',
    image: null,
  },
  {
    __typename: 'Media',
    id: '60ba8d51dc0b3e0015993e9f',
    createdAt: '2021-06-04T20:30:09.015Z',
    updatedAt: '2021-06-04T20:30:09.015Z',
    name: 'Media page',
    description: 'Media page description',
    type: 'IMAGE',
    document: null,
    video: null,
    image: {
      __typename: 'MediaImage',
      assembly: 'e03d456542c844f39cb489177e55a9f1',
      small:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/1e/abe1d0a4eb46459091206bfd305e6c/Media.png',
      medium:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/66/4a17fe586a48fd888d6a25a20b424c/Media.png',
      large:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/48/ad5b80e607407d9d7fe5d56e3959a5/Media.png',
      xLarge:
        'https://vca-documents.s3.ca-central-1.amazonaws.com/d4/1f640dcaf047468161291c509e05aa/Media.png',
    },
  },
  {
    __typename: 'Media',
    id: '60b5545f14367a001512fb2c',
    createdAt: '2021-05-31T21:25:51.851Z',
    updatedAt: '2021-05-31T21:25:51.851Z',
    name: 'Color',
    description: 'color description',
    type: 'DOCUMENT',
    document: {
      __typename: 'MediaDocumentFile',
      assembly: '9af2264f38c040c78781f6181f848bf1',
      url: 'https://vca-documents.s3.ca-central-1.amazonaws.com/4f/2242d76376445081bfbddd8f4f8b52/Colors-Qaltrak.pdf',
    },
    video: null,
    image: null,
  },
];

describe('List media page', () => {
  test('matches snapshot', async () => {
    const messages = locales['en'];
    const { asFragment } = render(
      <UserProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <BaseProvider theme={LightTheme}>
            <IntlProvider
              locale={'en'}
              defaultLocale={'en'}
              messages={messages}
            >
              <ListMedia medias={medias} />
            </IntlProvider>
          </BaseProvider>
        </MockedProvider>
      </UserProvider>,
      {}
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('List media items', async () => {
    const messages = locales['en'];
    render(
      <UserProvider>
        <IntlProvider locale={'en'} defaultLocale={'en'} messages={messages}>
          <ListMedia medias={medias} />
        </IntlProvider>
      </UserProvider>,

      {}
    );
    const headings = await screen.findAllByRole('heading');
    expect(headings).toHaveLength(3);
    const titles = headings.reduce((acc, current) => {
      acc.push(current.textContent);
      return acc;
    }, []);
    headings.forEach((heading) => {
      expect(titles.includes(heading.textContent)).toBeTruthy();
    });
  });
});
