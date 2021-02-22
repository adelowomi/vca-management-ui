import React from 'react';
import { Helmet } from 'react-helmet';

type MetaItem = {
  name: string;
  content: string;
};

type SEOProps = {
  title?: string;
  description?: string;
  url?: string;
  author?: string;
  keywords?: string[];
  meta?: MetaItem[];
  image?: string;
};

const SEO: React.FC<SEOProps> = (props) => {
  const meta = [];
  const siteTitle = props.title || 'Stroybook';
  const siteDescription = props.description || 'Storybook';
  const siteUrl = props.url || 'https://app.storybook.com';
  const siteAuthor = props.author || 'Storybook inc';
  const siteImage = props.image || 'icons/icon_512x512.png';
  const siteKeywords = ['storybook'];
  const metaData = [
    {
      name: 'canonical',
      content: siteUrl,
    },
    {
      name: 'description',
      content: siteDescription,
    },
    {
      name: 'image',
      content: siteImage,
    },
    {
      name: 'og:url',
      content: siteUrl,
    },
    {
      name: 'og:type',
      content: 'article',
    },
    {
      name: 'og:title',
      content: siteTitle,
    },
    {
      name: 'og:description',
      content: siteDescription,
    },
    {
      name: 'og:image',
      content: siteImage,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:creator',
      content: siteAuthor,
    },
    {
      name: 'twitter:title',
      content: siteTitle,
    },
    {
      name: 'twitter:description',
      content: siteDescription,
    },
    {
      name: 'twitter:image',
      content: siteImage,
    },
    {
      name: 'keywords',
      content: siteKeywords,
    },
  ].concat(meta);

  const linkData = [
    {
      rel: 'shortcut icon',
      href: 'favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: 'icons/apple-touch-icon.png',
    },
  ];
  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={siteTitle}
      meta={metaData}
      link={linkData}
    />
  );
};

export { SEO };
