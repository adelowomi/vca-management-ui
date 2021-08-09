import React from 'react';
import { RiFileList3Line, RiImageFill, RiVideoAddLine } from 'react-icons/ri';

import { Media } from '../../classes/schema';

export default function MediaCard2({
  media,
  setMedia,
  selected
}: {
  media: Media;
  setMedia: any;
  selected: any;
}): JSX.Element {
  return (
    <>
      <div
        //   onClick={() => handleClick(media)}
        className="group w-full overflow-hidden border border-gray-400 hover:shadow-lg bg-white shadow-md"
      >
        <div className="h-40 w-full">
          {media.type === 'VIDEO' ? (
            <video
              className="w-full h-full object-cover"
              src={media.video.url}
            />
          ) : media.type === 'IMAGE' ? (
            <img
              className="w-full h-full object-cover"
              src={media.image.small}
              alt="news image"
            />
          ) : media.type === 'DOCUMENT' ? (
            <img
              className="w-full h-full object-cover"
              src={media.image.small}
              alt="news image"
            />
          ) : (
            ''
          )}

          <div className="relative -top-36 left-2 ">
            <input
              type="checkbox"
              className="px-3 h-6 w-6 border border-gray-300 mr-3"
              onChange={() => setMedia(media.id)}
              checked={media.image && media.image.small == selected.image.small ? true : false} 
            />
          </div>
        </div>
        <div className="px-3 py-4">
          <span className="flex space-x-2 items-center flex-row mb-2">
            {media.type === 'VIDEO' ? (
              <RiVideoAddLine className="h-6 w-6" />
            ) : media.type === 'IMAGE' ? (
              <RiImageFill className="h-6 w-6" />
            ) : media.type === 'DOCUMENT' ? (
              <RiFileList3Line className="h-6 w-6" />
            ) : (
              ''
            )}
            <h1 className="font-semibold text-lg ">{media.name}</h1>
          </span>
          <p className="text-gray-700 text-sm">{media.description}</p>
        </div>
      </div>
    </>
  );
}
