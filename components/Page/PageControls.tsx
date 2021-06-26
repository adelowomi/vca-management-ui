import Link from 'next/link';
import * as React from 'react';

import { Btn } from './PageButtons';
import { H1, RowSection } from './PageStyledElements';
export interface PageControlsProps {
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  siteId: string | string[];
}

export const PageControls = ({
  onSubmit,
  title,
  siteId,
}: PageControlsProps) => {
  return (
    <>
      <RowSection className="justify-between">
        <H1>{title}</H1>
        <div className="flex flex-row justify-start space-x-5">
          <Btn color="primary" $bg="secondary" $px="sm">
            <Link href={`/sites/${siteId}/pages`}> Cancel</Link>
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
