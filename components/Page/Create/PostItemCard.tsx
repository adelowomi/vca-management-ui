import React from 'react';
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
interface CardsProps {
  item: {
    id: string;
    mediaUrl: string;
    title: string;
    content: string;
  };
  selectedArr: any;
  selected: any;
  count: number;
  exists: boolean;
}
export const PostItemCard = ({
  item,
  selectedArr,
  selected,
  count,
  exists,
}) => {
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
        onClick={() => handleClick(item)}
        className="group w-full overflow-hidden border border-gray-400 hover:shadow-lg bg-white shadow-md"
      >
        <div className="h-40 w-full">
          <img
            className="w-full h-full object-cover"
            src={item.media.image.small}
            alt="news image"
          />
          <div className="relative -top-36 left-2 ">
            <Input type="checkbox" ref={ref} defaultChecked={exists} />
          </div>
        </div>
        <div className="px-3 py-4">
          <h1 className="font-semibold text-lg mb-2">{item.category}</h1>
          <p className="text-gray-700 text-sm">{item.description}</p>
        </div>
      </div>
    </>
  );
};
