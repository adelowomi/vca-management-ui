import * as React from 'react';

import { SelectMediaModal } from '../../utilsGroup/SelectMediaModal';
import { HeaderTypeBtn } from './PageButtons';
import {
  ColumnSection,
  H2,
  HeaderTypeWrapper,
  ImageSelectBox,
} from './pageStyledElements';

export interface PageHeaderStyleProps {
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  headerType: string;
  state: any;
  setState: any;
  medias: any;
  handleSubmit: any;
}

export function PageHeaderStyle({
  onButtonClick,
  headerType,
  state,
  setState,
  medias,
  handleSubmit,
}: PageHeaderStyleProps) {
  const [open, setOpen] = React.useState(false);
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
        <SelectMediaModal
          open={open}
          setOpen={setOpen}
          medias={medias}
          state={state}
          setState={setState}
          handleSubmit={handleSubmit}
        />
      </ColumnSection>
    </>
  );
}
