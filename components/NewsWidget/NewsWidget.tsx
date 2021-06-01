import React, { useRef } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Slider from 'react-slick';

import { WidgetCard } from './WidgetCard';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
interface CardsProps {
  id: string;
  mediaUrl: string;
  title: string;
  content: string;
}
type newsWidgetProps = {
  items: CardsProps[];
  contain: boolean;
  title: string;
  desc: string;
};

export const NewsWidget: React.FC<newsWidgetProps> = ({
  items,
  contain = true,
  title,
  desc,
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
    <div className="w-full mx-auto bg-gray-50 relative mt-6">
      <div className="container mx-auto py-16 font-sans w-4/5">
        <div className="mb-10 ">
          <h1 className="font-medium text-3xl text-center mb-3">{title}</h1>
          <h1 className="text-gray-400 text-xl font-normal text-center">
            {desc}
          </h1>
        </div>
        <div className="flex justify-between w-10/12 absolute top-1/2 z-30 lg:left-28 left-9">
          <div className="text-black -ml-14 z-0" onClick={gotoPrevious}>
            <RiArrowLeftSLine className="h-6 w-8" />
          </div>
          <div className="text-black mr-4 z-0" onClick={gotoNext}>
            <RiArrowRightSLine className="h-6 w-8" />
          </div>
        </div>
        <Slider className="" {...settings} ref={sliderRef}>
          {items.map((item, index: number) => (
            <WidgetCard key={index} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  ) : (
    <>
      <div className="flex mb-2 justify-end">
        <div className="text-black -ml-14" onClick={gotoPrevious}>
          <RiArrowLeftSLine className="h-6 w-8" />
        </div>
        <div className="text-black mr-4" onClick={gotoNext}>
          <RiArrowRightSLine className="h-6 w-8" />
        </div>
      </div>
      <Slider className="" {...settings} ref={sliderRef}>
        {items.map((item: CardsProps, index: number) => (
          <WidgetCard key={index} item={item} />
        ))}
      </Slider>
    </>
  );
};
