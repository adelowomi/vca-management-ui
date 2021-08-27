import React from 'react';
import Moment from 'react-moment';
import ReactPlayer from 'react-player';

export const getStringDate = (date = new Date()) => {
  return <Moment format="Do MMM YYYY">{date}</Moment>;
};

// import { Pagination } from '../../Pagination/Pagination';

const PostList = ({ pageItems }: { pageItems: any }): JSX.Element => {
  return (
    <div className="mt-7">
      <div className="grid grid-cols-4 gap-2">
        {pageItems.map((news, index) => {
          
          return (
            <div
              className="flex xl:w-card-xl lg:w-card-lg 2xl:w-card-2xl md:w-card-md rounded"
              key={index}
            >
              <div className="group w-full overflow-hidden hover:shadow-lg bg-white shadow-md">
                <div className="h-44 w-full">
                  {news && news.media.type == 'IMAGE' ? (
                    <img
                      className="w-full h-full object-cover rounded-tr rounded-tl"
                      src={news.media.image.small}
                      alt="news image"
                    />
                  ) : news &&  news.media.type  == "VIDEO" ?(
                    <ReactPlayer url={news.media.video.url} width={"100%"} height={"100%"} />
                  ) : ""}
                </div>
                <div className="px-3 py-4" style={{ height: '250px' }}>
                  <div className="font-semibold text-lg mb-2">
                    <a href={`/item/${news?.id}`}>{news?.featured}</a>
                  </div>
                  <p className="text-gray-700 text-sm">{news?.description}</p>
                </div>
                <button className="w-full bg-white text-gray-800 font-normal py-3 px-4 flex justify-left items-center text-xs italic rounded">
                  Created on: {getStringDate(news?.createdAt)}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* <Pagination next prev /> */}
    </div>
  );
};

export default PostList;
