import { boolean } from '@storybook/addon-knobs';
import React, { useRef } from 'react';
import Slider from 'react-slick';

import { NewsCard } from '../NewsCard/NewsCard';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

type NewsWidgetProps = {
  news: {
    description: string;
    disable: boolean;
    title: string;
    items: [string];
  };
  contain: boolean;
};
export const NewsWidget: React.FC<NewsWidgetProps> = ({
  news,
  contain = false,
}) => {
  const sliderRef = useRef(null);

  const gotoNext = () => {
    if (sliderRef != null) {
      sliderRef.current.slickNext();
    }
  };

  const gotoPrevious = () => {
    sliderRef.current.slickPrev();
  };
  return contain ? (
    <div className="container mx-auto  p-10 pt-16 font-sans">
      <div className="mb-10 ">
        <h1 className="uppercase font-bold text-3xl">{news.title}</h1>
        <h1 className="text-primary text-xl font-bold">{news.description}</h1>
      </div>
      <div className="flex mb-2 justify-end">
        <div
          className="bg-primary text-white py-1 px-4 mr-1"
          onClick={gotoPrevious}
        >
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className="bg-primary text-white py-1 px-4" onClick={gotoNext}>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
      <Slider className="" {...settings} ref={sliderRef}>
        {news.items.map((record: any, index: number) => (
          <NewsCard key={index} news={record} />
        ))}
      </Slider>
    </div>
  ) : (
    <>
      <div className="flex mb-2 justify-end">
        <div
          className="bg-primary text-white py-1 px-4 mr-1"
          onClick={gotoPrevious}
        >
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className="bg-primary text-white py-1 px-4" onClick={gotoNext}>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
      <Slider className="" {...settings} ref={sliderRef}>
        {news.items.map((record: any, index: number) => (
          <NewsCard key={index} news={record} />
        ))}
      </Slider>
    </>
  );
};
