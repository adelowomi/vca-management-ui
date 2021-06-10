import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { EDIT_ITEM } from '../../graphql/items.gql';
import { SelectItemsModal } from '../utilsGroup/SelectItemsModal';
import { ShadowBtn } from './PageButtons';
import { ColumnSection, H2, ImageSelectBox } from './PageStyledElements';

export const PagePosts = ({ items, client, pageId }) => {
  const [open, setOpen] = React.useState(false);
  const { addToast } = useToasts();
  const [state, setState] = React.useState({
    itemId: '',
  });
  const handleSubmit = (setOpen: any) => async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await client.mutate({
        mutation: EDIT_ITEM,
        variables: {
          updateItemInput: {
            pageId,
          },
          itemId: state.itemId,
        },
      });
      addToast('Item is successfully added to page', { appearance: 'success' });
      setOpen(false);
    } catch (error) {
      addToast('Failed to add item to page', { appearance: 'error' });

      setOpen(false);
    }
  };

  return (
    <>
      <ColumnSection>
        <H2 className="mt-4">3. Post section</H2>
        <ImageSelectBox
          className="mt-5 w-96 flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <p>+ Add posts</p>
        </ImageSelectBox>
        <div className="mt-5">
          <ShadowBtn className="py-4 px-10 shadow-sm rounded text-sm font-bold">
            Preview body
          </ShadowBtn>
        </div>
        <SelectItemsModal
          open={open}
          setOpen={setOpen}
          setState={setState}
          state={state}
          handleSubmit={handleSubmit}
          items={items}
          type="posts"
        />
      </ColumnSection>
    </>
  );
};
