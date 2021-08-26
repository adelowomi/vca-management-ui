import React from 'react';

export default function LoadingCard(): JSX.Element {
  return (
    <div className="w-64 bg-white rounded shadow-md">
      {/* image */}
      <div className="h-32 bg-gray-200 rounded-tr rounded-tl animate-pulse" />
      <div className="p-5">
        {/* title */}
        <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4" />
        {/* content */}
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse" />
          <div className="h-4 rounded-sm bg-gray-200 animate-pulse" />
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse" />
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse" />
          <div className="h-4 rounded-sm bg-gray-200 animate-pulse" />
          <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse" />
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse" />
          <div className="h-4 rounded-sm bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
