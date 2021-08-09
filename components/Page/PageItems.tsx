import React, { useState } from 'react';

import { ItemsModal2 } from './ItemsModal2';
import { ShadowBtn } from './PageButtons';
import { ColumnSection, H2, ImageSelectBox } from './PageStyledElements';
import PostList from './PostList';

export const PageItems = ({
  items,
  existingItems,
  refresh,
  token,
}: {
  items: any[];
  existingItems: any[];
  refresh: any;
  token?: any;
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [pageItems, setPageItems] = useState(existingItems ?? []);
  const [showPreview, setShowPreview] = useState(true);

  return (
    <>
      <ItemsModal2
        open={open}
        close={setOpen}
        items={items}
        existingItems={existingItems}
        setNewItems={setPageItems}
        refresh={refresh}
        token={token}
      />
      <ColumnSection>
        <H2 className="mt-4">3. Post section</H2>
        <ImageSelectBox
          className="mt-5 w-96 flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <p>+ Add posts</p>
        </ImageSelectBox>
        <div className="mt-5">
          <ShadowBtn
            className="py-4 px-10 shadow-sm rounded text-sm font-bold"
            type="button"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Hide preview' : 'Show preview'}
          </ShadowBtn>
        </div>
        {showPreview ? <PostList pageItems={pageItems} /> : null}
      </ColumnSection>
    </>
  );
};