import React from 'react';
export interface HeroModel {
  mediaUrl: string;
  actionText: string;
  heading: string;
  location: string;
  hasAction: boolean;
  caption?: string;
  type?: string;
}

export function Hero({ hero }: { hero: HeroModel }) {
  return (
    <>
      <div className="bg-gray-50 font-sans w-full hidden">
        <main className="lg:relative">
          <div className="flex w-full items-center h-hero">
            <div
              className={
                hero.location == 'LEFT'
                  ? 'w-full text-left'
                  : hero.location == 'RIGHT'
                  ? 'w-full text-center order-last'
                  : 'hidden'
              }
            >
              <div
                className={hero.location == 'LEFT' ? 'w-full pl-28' : 'w-full'}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span className="block text-primary xl:inline capitalize">
                    {hero.actionText
                      ? hero.actionText
                      : hero.actionText
                      ? hero.actionText
                      : 'Online business'}
                  </span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                  {hero.heading}
                </p>
                <div
                  className={
                    hero.location == 'LEFT'
                      ? 'mt-10 sm:flex sm:justify-center lg:justify-start'
                      : hero.location == 'RIGHT'
                      ? 'mt-10 sm:flex sm:justify-center lg:justify-center'
                      : 'hidden'
                  }
                >
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={'w-full h-64 sm:h-72 md:h-96 lg:h-full'}>
              <img
                className="inset-0 w-full h-full object-cover"
                src={hero.mediaUrl}
                alt="hero image"
              />
            </div>
          </div>
        </main>
      </div>

      <div className="pb-24 mt-12">
        <div
          className="bg-center bg-white h-hero w-full container h-96 flex lg:justify-start md:justify-center justify-center"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.7) 1.68%, rgba(0, 0, 0, 0) 88.4%), url( ${hero.mediaUrl})`,
          }}
        >
          <div className="bg-transparent lg:w-2/4 w-full h-full flex items-center justify-center">
            <div className="w-4/5">
              <h1 className="text-4xl text-white font-bold font-roboto w-full lg:text-left md:text-center text-center">
                {hero.heading}
              </h1>
              {hero.hasAction ? (
                <button className="w-2/5 flex items-center justify-center border border-blue-500 focus:outline-none bg-blue-500 text-base font-medium text-white bg-primary \ md:text-lg h-12 mt-6  mx-auto lg:mx-0 md:mx-auto">
                  {hero.actionText}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
