import React from 'react';
import ReactPlayer from 'react-player';

import { Item } from '../../classes/schema';
import { getStringDate } from './PostList';

export default function SingleItem({item}: {item:Item}): JSX.Element {
  return (
    <div className="flex xl:w-card-xl lg:w-card-lg 2xl:w-card-2xl md:w-card-md rounded">
      <div className="group w-full overflow-hidden hover:shadow-lg bg-white shadow-md">
        <div className="h-44 w-full">
          {item && item.media?.type == 'IMAGE' ? (
            <img
              className="w-full h-full object-cover rounded-tr rounded-tl"
              src={item.media.image.small}
              alt="item image"
            />
          ) : item && item.media?.type == 'VIDEO' ? (
            <ReactPlayer
              url={item.media?.video?.url}
              width={'100%'}
              height={'100%'}
            />
          ) : (
            ''
          )}
        </div>
        <div className="px-3 py-4" style={{ height: '250px' }}>
          <div className="font-semibold text-lg mb-2">
            <a href={`/item/${item?.id}`}>{item?.featured}</a>
          </div>
          <p className="text-gray-700 text-sm">{item?.description}</p>
        </div>
        <button className="w-full bg-white text-gray-800 font-normal py-3 px-4 flex justify-left items-center text-xs italic rounded">
          Created on: {getStringDate(item?.createdAt)}
        </button>
      </div>
    </div>
  );
}
