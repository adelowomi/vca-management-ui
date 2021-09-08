import React, { useState } from 'react';

import { ItemsModal } from './ItemsModal';
import { ShadowBtn } from './PageButtons';
import { ColumnSection, H2, ImageSelectBox } from './PageStyledElements';
import PostList from './PostList';

export const PageItems = ({
  existingItems,
  refresh,
  token,
  profile,
}: {
  existingItems: any[];
  refresh: any;
  token?: any;
  profile: any;
}): JSX.Element => {
  
  const [open, setOpen] = useState(false);
  const [pageItems, setPageItems] = useState(existingItems ?? []);
  const [showPreview, setShowPreview] = useState(true);

  return (
    <>
      <ItemsModal
        open={open}
        close={setOpen}
        existingItems={existingItems}
        setNewItems={setPageItems}
        refresh={refresh}
        token={token}
        profile={profile}
      />
      <ColumnSection className="pb-10">
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
