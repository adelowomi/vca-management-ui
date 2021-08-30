import React from 'react';
import Moment from 'react-moment';

import SingleItem from './SingleItem';

export const getStringDate = (date = new Date()) => {
  return <Moment format="Do MMM YYYY">{date}</Moment>;
};

// import { Pagination } from '../../Pagination/Pagination';

const PostList = ({ pageItems }: { pageItems: any }): JSX.Element => {
  return (
    <div className="mt-7">
      <div className="grid grid-cols-4 gap-2">
        {pageItems.map((news, index) => {
          return <SingleItem item={news} key={index} />;
        })}
      </div>
      {/* <Pagination next prev /> */}
    </div>
  );
};

export default PostList;
