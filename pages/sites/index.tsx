import Link from 'next/link';
import React from 'react';

import Layout from '../../layouts/Dashboard';

const Sites = (props) => {
  const {
    sites: {
      data: { sites },
    },
  } = props;
  let count = 0;

  return (
    <Layout>
      <h1 className="text-lg">Welcome to all sites Sites</h1>
      {sites.map((el) => {
        return (
          <div className="text-blue-500" key={el.id}>
            <span className="pr-8 text-black">{++count}</span>
            <Link href={`sites/${el.id}}/`}>{el.name}</Link>
          </div>
        );
      })}
    </Layout>
  );
};

export default Sites;
