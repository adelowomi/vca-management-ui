import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

// import { Pagination } from '../../Pagination/Pagination';

const PostList = ({ pageItems, handleDelete }) => {
  return (
    <div className="mt-7">
      <div className="grid grid-cols-3 gap-8">
        {pageItems.map((item) => {
          return (
            <div
              className="group w-full overflow-hidden border border-gray-100 hover:shadow-lg bg-white shadow-md h-96"
              key={item.id}
            >
              <div className="h-48 w-full">
                <img
                  className="w-full h-full object-cover"
                  src={item?.media.image.small}
                  alt="news image"
                />
                <div
                  className="icon flex flex-row justify-end mr-5 -mt-40 cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                >
                  <RiDeleteBin7Fill className="h-6 w-6 text-white focus:text-red-400" />
                </div>
              </div>
              <div className="px-3 py-4">
                <h1 className="font-semibold text-lg mb-2">{item.content}</h1>
                <p className="text-gray-700 text-sm">{item.description}</p>
                <div className="mt-4">
                  <p className="text-xs italic text-gray-500">
                    Created on 14 April 2021
                  </p>
                </div>
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
