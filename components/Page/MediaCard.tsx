import React from 'react';
import { RiFileList3Line, RiImageFill, RiVideoAddLine } from 'react-icons/ri';
import styled from 'styled-components';

const Input = styled.input`
  background: white;
  width: 1.5rem;
  height: 1.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  position: relative;
  :checked {
    background: #1890ff;
  }
`;

export const MediaCard = ({ media, selectedArr, selected, count }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const handleClick = (id: string | number) => {
    const newArr = [...selected];
    const finder = newArr.findIndex((el) => el === id);
    if (newArr.length === count) {
      ref.current.checked = null;

      if (finder > -1) {
        newArr.splice(finder, 1);
      }
      selectedArr(newArr);
      return;
    } else {
      ref.current.checked = !ref.current.checked;
    }
    if (finder > -1) {
      newArr.splice(finder, 1);
    } else {
      newArr.push(id);
    }
    selectedArr(newArr);
  };

  return (
    <>
      <div
        onClick={() => handleClick(media)}
        className="group w-full overflow-hidden border border-gray-400 hover:shadow-lg bg-white shadow-md"
      >
        <div className="h-40 w-full">
          {media.type === 'VIDEO' ? (
            <video
              className="w-full h-full object-cover"
              src={media?.video?.url}
            />
          ) : // <iframe
          //   width="290"
          //   height="215"
          //   // src="https://www.youtube.com/embed/tgbNymZ7vqY"
          // ></iframe>
          media.type === 'IMAGE' ? (
            <img
              className="w-full h-full object-cover"
              src={media?.image?.small}
              alt="news image"
            />
          ) : media.type === 'DOCUMENT' ? (
            <img
              className="w-full h-full object-cover"
              src={media?.image?.small}
              alt="news image"
            />
          ) : (
            ''
          )}

          <div className="relative -top-36 left-2 ">
            <Input type="checkbox" ref={ref} />
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
};
