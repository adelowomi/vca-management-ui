import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

import Layout from '../../../../layouts/Dashboard';

const Pages = (props) => {
  //   const {
  //     sites: {
  //       data: { sites },
  //     },
  //   } = props;
  let count = 0;

  const PAGE_QUERY = gql`
    query Pages {
      pages(siteId: "60541bb457f1e20015fb15d4") {
        site
        menuItem
        name
        tags
        hero {
          mediaUrl
          heading
          hasAction
          actoinText
          actoinSlug
          location
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(PAGE_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <Layout>
      <h1 className="text-lg">Welcome to all sites Pages</h1>
      {data.pages.map((el, i) => {
        return (
          <div className="text-blue-500" key={i}>
            <span className="pr-8 text-black">{++count}</span>
            <Link
              href={`sites/${el.site}/pages/${el.name.split(' ').join('_')}`}
            >
              {` ${el.name} :
              sites/${el.site}/pages/${el.name.split(' ').join('_')}`}
            </Link>
          </div>
        );
      })}
    </Layout>
  );
};

export default Pages;
