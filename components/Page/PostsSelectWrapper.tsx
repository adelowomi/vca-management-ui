import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import styled from 'styled-components';

import { SelectButton } from './PageButtons/SelectButton';
import { PageSearchInput } from './PageSearchInput';
import { H1 } from './PageStyledElements';
import { PostItemCard } from './PostItemCard';

const Container = styled.div`
  box-sizing: border-box;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const options = [
  { id: 'pageId', name: 'Page ID' },
  { id: 'type', name: 'Media type' },
];

export const PostSelectWrapper = ({
  setOpen,
  setState,
  state,
  handleSubmit,
  items,
  type,
}) => {
  const arr = state && state.widgetItems ? [...state.widgetItems] : [];
  const [selected, setSelected] = React.useState(arr);

  React.useEffect(() => {
    if (type === 'posts') {
      setState({
        ...state,
        itemId: selected[selected.length - 1],
      });
    } else if (type === 'widget') {
      setState({
        ...state,
        widgetItems: [...selected],
      });
    }
  }, [selected]);

  const selectedArr = (arr: any) => {
    setSelected([...arr]);
  };

  return (
    <Container>
      <Row>
        <H1 className="mb-10">Select Media</H1>
        <button
          className="flex space-x-2 justify-center focus:outline-none"
          type="button"
          onClick={() => setOpen(false)}
        >
          <span className="font-semibold text-base">Close</span>
          <RiCloseLine className="h-6 w-5" aria-hidden="true" />
        </button>
      </Row>
      <Row>
        <div className="flex flex-row justify-start space-x-4">
          <div className="w-">
            <PageSearchInput />
          </div>
          <div className="w-60">
            <SelectButton
              name="filterBy"
              py={2.5}
              px={5}
              caption="Filter by"
              handleChange={() => {
                return;
              }}
              value={''}
              options={options}
            />
          </div>
        </div>
        <div>
          <button
            style={{ background: '#1890FF' }}
            className="py-3.5 px-8 text-white rounded-sm font-bold text-sm focus:outline-none"
            onClick={handleSubmit(setOpen)}
          >
            Add Media
          </button>
        </div>
      </Row>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {items.map((item) => (
          <PostItemCard
            key={item.id}
            item={item}
            selectedArr={selectedArr}
            selected={selected}
            count={type === 'posts' ? 1 : 8}
            exists={
              selected.findIndex((el) => el === item.id) > -1 ? true : false
            }
          />
        ))}
      </div>
    </Container>
  );
};
