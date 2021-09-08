import * as React from 'react';

import { ErrorProps } from '../../types/interfaces';
import {
  ColumnSection,
  H2,
  ImageSelectBox,
} from './PageStyledElements';
import SelectMediaModal from './SelectMediaModal';

export interface PageHeaderStyleProps {
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  headerType: string;
  state: any;
  setState: any;
  medias: any;
  handleSubmit?: any;
  errors?: ErrorProps;
  profile;
  token;
}

export function PageHeaderStyle({
  state,
  setState,
  errors,
  profile,
  token,
}: PageHeaderStyleProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const setMedia = (media: any) => {
    console.error(media);
    setState({ ...state, media: media.id, mediaUrl: media.image.large });
  };
  return (
    <>
      <ColumnSection>
        <H2 className="mt-6">Media Image</H2>
        <ImageSelectBox
          onClick={() => setOpen(!open)}
          className="mt-5 w-96 flex items-center justify-center cursor-pointer"
        >
          <p>+ Select from media gallery</p>
        </ImageSelectBox>
        {errors && errors.mediaUrl && (
          <span className="text-red-500 mt-1">{errors.mediaUrl}</span>
        )}
        <SelectMediaModal
          open={open}
          close={setOpen}
          profile={profile}
          selected={state.media}
          setMedia={setMedia}
          token={token}
          type={"IMAGE"}
        />
      </ColumnSection>
    </>
  );
}
