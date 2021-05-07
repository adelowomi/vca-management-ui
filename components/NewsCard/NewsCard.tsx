import React from 'react';

type NewsProps = {
  news: {
    content: string;
    category: string;
    draft: boolean;
    mediaUrl: string;
    slug: string;
    id: string;
  };
};

export const NewsCard = ({ news }: NewsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg lg:w-72 lg:mr-4 mb-12">
      <img
        src={news.mediaUrl}
        alt="news image"
        className="rounded-t-lg w-full"
      />
      <div className="p-6">
        <h2 className="font-bold mb-2 text-xl text-gray-700 uppercase">
          {news.content}
        </h2>
        <p className="text-gray-500 mb-2">{news.category}</p>
        <div className="flex justify-between mt-10">
          <p className="text-primary mb-2 font-light text-sm">Aug 9, 2021</p>
          <a
            href="#"
            className="text-primary hover:text-purple-500 font-bold text-sm"
          >
            Read More
          </a>
        </div>
      </div>
    </div>

    // <div className="">
    // <div className="h-56 mb-20 rounded-lg ">
    //   <img
    //     src={news.mediaUrl}
    //     className="w-full rounded-sm h-full object-cover object-top"
    //   />
    //   <h1 className="text-xl text-gray-darkest font-bold uppercase">
    //     {news.mainText}
    //   </h1>
    //   <p className="text-base text-gray-dark font-normal">{news.subText}</p>
    // </div>
    // </div>
  );
};
