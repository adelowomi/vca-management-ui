import React from 'react';

export const WidgetCard = ({ item }) => {
  return (
    <>
      <div className="group w-full overflow-hidden border border-gray-100 hover:shadow-lg bg-white shadow-md">
        <div className="h-40 w-full">
          <img
            className="w-full h-full object-cover"
            src={item?.media?.image?.small}
            alt="news image"
          />
        </div>
        <div className="px-3 py-4">
          <h1 className="font-semibold text-lg mb-2">{item?.featured}</h1>
          <p className="text-gray-700 text-sm">{item?.description}</p>
        </div>
      </div>
    </>
  );
};
