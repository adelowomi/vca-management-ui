import Link from 'next/link';
import React from 'react';

export const WidgetCard = ({ item }) => {
  return (
    <>
      <div className="flex xl:w-card-xl lg:w-card-lg 2xl:w-card-2xl md:w-card-md rounded" style={{height:'478px'}}>
        <div className=" w-11/12 overflow-hidden hover:shadow-lg bg-white shadow-md">
          <div className="h-44 w-full">
            <img
              className="w-full h-full object-cover rounded-t"
              src={item.media.image ? item.media.image.medium : ''}
              alt="news image"
            />
          </div>
          <div className="px-3 py-4" style={{height:'250px'}}>
            <div className="font-semibold text-lg mb-2">{item.featured}</div>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>

          <button className="w-full  border-t border-gray-200 hover:text-white font-bold py-3 px-4 flex justify-center items-center hover:bg-vca-blue text-xs rounded-b shadow-xl hover:shadow-lg" style={{height:'48px'}}>
            <Link href={``}>Read More</Link>
          </button>
        </div>
      </div>
    </>
  );
};
