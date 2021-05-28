import * as React from 'react';

import { Btn } from './PageButtons';
import { H1, RowSection } from './pageStyledElements';
export interface PageControlsProps {
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
}

export const PageControls = ({ onSubmit, title }: PageControlsProps) => {
  return (
    <>
      <RowSection className="justify-between">
        <H1>{title}</H1>
        <div className="flex flex-row justify-start space-x-5">
          <Btn color="primary" $bg="secondary" $px="sm">
            Cancel
          </Btn>

          <Btn
            color="secondary"
            $bg="primary"
            $px="lg"
            onClick={onSubmit}
            type="submit"
          >
            Save & Publish
          </Btn>
        </div>
      </RowSection>
    </>
  );
};
