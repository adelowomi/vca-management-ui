import Router from 'next/router';
import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { EDIT_ITEM } from '../../graphql/items.gql';
import { SelectItemsModal } from '../utilsGroup/SelectItemsModal';
import { ShadowBtn } from './PageButtons';
import { ColumnSection, H2, ImageSelectBox } from './PageStyledElements';

export const PagePosts = ({ items, client, pageId, pageItems }) => {
  const [open, setOpen] = React.useState(false);
  const { addToast } = useToasts();
  const [state, setState] = React.useState({
    itemId: null,
    posts: [...pageItems],
  });

  // const filterPosts = (posts: any, id: string) => {
  //   return posts.filter((el: any) => el.id !== id);
  // };

  // const handleDelete = async (itemId: string) => {
  //   try {
  //     await client.mutate({
  //       mutation: EDIT_ITEM,
  //       variables: {
  //         updateItemInput: {
  //           pageId: null,
  //         },
  //         itemId: itemId,
  //       },
  //     });
  //     setState({
  //       ...state,
  //       posts: filterPosts(state.posts, itemId),
  //     });
  //     addToast('Item is successfully removed from this page.', {
  //       appearance: 'success',
  //     });

  //     Router.reload();
  //   } catch (error) {
  //     addToast('Failed to remove Item from this page.', {
  //       appearance: 'error',
  //     });
  //     setOpen(false);
  //     return;
  //   }
  // };

  const getItems = (selected: any) => {
    setState({
      ...state,
      itemId: selected[selected.length - 1]?.id
        ? selected[selected.length - 1]?.id
        : null,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await client.mutate({
        mutation: EDIT_ITEM,
        variables: {
          updateItemInput: {
            pageId: pageId,
          },
          itemId: state.itemId,
        },
      });
      addToast('Item is successfully added to page', { appearance: 'success' });
      setOpen(false);
      Router.reload();
      return;
    } catch (error) {
      addToast('Failed to add item to page', { appearance: 'error' });
      setOpen(false);
      return;
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
        {/* <PostList pageItems={state.posts} handleDelete={handleDelete} /> */}

        {/* modal for adding posts to page */}
        <SelectItemsModal
          open={open}
          setOpen={setOpen}
          getItems={getItems}
          state={[]}
          handleSubmit={handleSubmit}
          items={items}
          type="posts"
        />
      </ColumnSection>
    </>
  );
};
