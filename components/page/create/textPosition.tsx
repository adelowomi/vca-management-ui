import * as React from 'react';

import { ErrorProps } from '../../../types/interfaces';
import { HeaderTypeBtn } from './PageButtons';
import { Input } from './PageInput';
import { ColumnSection, H2, HeaderPositionWrapper } from './pageStyledElements';

export interface TextpositionProps {
  locationButtonClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  textPosition: string;
  headerText: string;
  captionText: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: ErrorProps;
}

export function Textposition({
  locationButtonClick,
  textPosition,
  handleChange,
  headerText,
  captionText,
  errors,
}: TextpositionProps) {
  return (
    <>
      <ColumnSection>
        <HeaderPositionWrapper>
          <div className="flex flex-col w-full">
            <H2 className="mb-5">Header Text</H2>
            <div className="w-full">
              <Input
                className="py-4 w-96 "
                placeholder="Enter text"
                onChange={handleChange}
                name="headerText"
                value={headerText}
              />
            </div>
            {errors && errors.headerText && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.headerText}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full ml-6">
            <H2 className="mb-5">Text Position</H2>
            <div className="flex flex-row justify-between space-x-3">
              <HeaderTypeBtn
                active={textPosition === 'LEFT' ? true : false}
                value="LEFT"
                data-textposition="LEFT"
                onClick={locationButtonClick}
                type="button"
              >
                Left
              </HeaderTypeBtn>
              <HeaderTypeBtn
                active={textPosition === 'RIGHT' ? true : false}
                value="RIGHT"
                data-textposition="RIGHT"
                onClick={locationButtonClick}
                type="button"
              >
                Right
              </HeaderTypeBtn>
              <HeaderTypeBtn
                active={textPosition === 'CENTER' ? true : false}
                value="CENTER"
                data-textposition="CENTER"
                onClick={locationButtonClick}
                type="button"
              >
                Centre
              </HeaderTypeBtn>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <H2 className="mb-4 mt-6">Caption Text</H2>
            <div className="w-full">
              <Input
                className="py-4 w-96 "
                placeholder="Enter text"
                onChange={handleChange}
                name="captionText"
                value={captionText}
              />
            </div>
            {errors && errors.captionText && (
              <span className="text-red-500 mt-2 text-sm font-medium">
                {errors.captionText}
              </span>
            )}
          </div>
        </HeaderPositionWrapper>
      </ColumnSection>
    </>
  );
}
