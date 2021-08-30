import React from 'react';

import { Hero } from '../../classes/schema';

export interface HeroProps {
  mediaUrl: string;
  actionText: string;
  heading: string;
  location: string;
  hasAction: string | boolean;
  caption?: string;
  type?: string;
}

export const HeroPreview = ({ hero }: { hero: Hero }): JSX.Element => {
  console.error(hero.media);
  
  return (
    <>
      <div className="pb-24 mt-12 rounded">
        <div
          className="bg-cover bg-white h-hero lg:w-hero-lg container mx-auto flex lg:justify-start md:justify-center justify-center rounded"
          style={{
            backgroundImage:
              hero.location == 'LEFT'
                ? `linear-gradient(90deg, rgba(0, 0, 0, 0.7) 1.68%, rgba(0, 0, 0, 0) 88.4%), url( ${
                    hero.media && hero.media.image?.large
                  })`
                : hero.location == 'RIGHT'
                ? `linear-gradient(260deg, rgba(0, 0, 0, 0.7) 1.68%, rgba(0, 0, 0, 0) 88.4%), url( ${
                    hero.media && hero.media.image?.large
                  })`
                : `linear-gradient(90deg, rgba(0, 0, 0, 0.7) 1.68%, rgba(0, 0, 0, 0) 88.4%), url( ${
                    hero.media && hero.media.image?.large
                  })`,
            height: '490px',
          }}
        >
          <div className="bg-transparent  w-full h-full flex items-center justify-center">
            <div className="w-4/5 flex justify-end flex-col">
              <div
                className={
                  hero.location == 'LEFT'
                    ? `w-full flex justify-start`
                    : hero.location == 'RIGHT'
                    ? `w-full flex justify-end`
                    : `w-full flex justify-center`
                }
              >
                <h1
                  className={
                    hero.location == 'LEFT'
                      ? `text-4xl text-white font-bold font-roboto w-1/2 lg:text-left md:text-center text-center`
                      : hero.location == 'RIGHT'
                      ? `text-4xl text-white font-bold font-roboto w-1/2 lg:text-right md:text-center text-center`
                      : `text-4xl text-white font-bold font-roboto w-1/2 lg:text-center md:text-center text-center`
                  }
                >
                  {hero.heading}
                </h1>
              </div>
              {hero.hasAction ? (
                <div
                  className={
                    hero.location == 'LEFT'
                      ? `w-full flex justify-start`
                      : hero.location == 'RIGHT'
                      ? `w-full flex justify-end`
                      : `w-full flex justify-center`
                  }
                >
                  <button className="w-36   border-none text-base font-medium text-white hover:bg-indigo-700 md:text-lg h-12 mt-6 font-roboto bg-vca-blue ">
                    {hero.actionText}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
