import * as React from 'react';

import { ErrorProps } from '../../types/interfaces';
import { HeaderTypeBtn } from './PageButtons';
import {
  ColumnSection,
  H2,
  HeaderTypeWrapper,
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
  onButtonClick,
  headerType,
  state,
  setState,
  errors,
  profile,
  token,
}: PageHeaderStyleProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const setMedia = (media: any) => {
    console.error(media);
    setState({ ...state, media: media.id, mediaUrl: media.image.small });
  };
  return (
    <>
      <ColumnSection>
        <H2 className="mb-6">1. Hero Type</H2>
        <HeaderTypeWrapper>
          <HeaderTypeBtn
            value="headerTypeOne"
            data-headertype="headerTypeOne"
            onClick={onButtonClick}
            type="button"
            active={headerType === 'headerTypeOne' ? true : false}
          >
            Header Type 1
          </HeaderTypeBtn>
          <HeaderTypeBtn
            active={headerType === 'headerTypeTwo' ? true : false}
            value="headerTypeTwo"
            data-headertype="headerTypeTwo"
            onClick={onButtonClick}
            type="button"
          >
            Header Type 2
          </HeaderTypeBtn>
          <HeaderTypeBtn
            value="headerTypeThree"
            data-headertype="headerTypeThree"
            onClick={onButtonClick}
            type="button"
            active={headerType === 'headerTypeThree' ? true : false}
          >
            Header Type 3
          </HeaderTypeBtn>
          <HeaderTypeBtn
            value="headerTypeFour"
            data-headertype="headerTypeFour"
            onClick={onButtonClick}
            type="button"
            active={headerType === 'headerTypeFour' ? true : false}
          >
            Header Type 4
          </HeaderTypeBtn>
        </HeaderTypeWrapper>
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
