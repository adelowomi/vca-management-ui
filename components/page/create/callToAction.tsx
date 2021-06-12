import * as React from 'react';

import { ErrorProps } from '../../../types/interfaces';
// import { ShadowBtn } from './PageButtons';
import { SelectButton } from './PageButtons/SelectButton';
import { Input } from './PageInput';
import { ColumnSection, Grid, H2 } from './pageStyledElements';

export interface CallToActionProps {
  actionText: string;
  ctaLink: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasAction?: boolean | string;
  errors: ErrorProps;
}

const options = [
  { id: 'false', name: 'Inactive' },
  { id: 'true', name: 'active' },
];

export const CallToAction: React.FC<CallToActionProps> = ({
  actionText,
  ctaLink,
  handleChange,
  errors,
  hasAction,
}) => {
  return (
    <>
      <ColumnSection>
        <Grid className="space-x-5">
          <div className="flex flex-col w-full">
            <H2 className="mb-5">Call to action button</H2>
            <div className="w-full">
              <SelectButton
                name="hasAction"
                caption="Select action"
                px={5}
                py={4}
                handleChange={handleChange}
                value={hasAction}
                options={options}
              />
            </div>
          </div>

          <div className="w-full mt-12">
            <Input
              className="py-4 w-72 "
              placeholder="Action Text"
              onChange={handleChange}
              name="actionText"
              value={actionText}
            />
            {errors && errors.actionText && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.actionText}
              </span>
            )}
          </div>

          <div className="w-full mt-12">
            <Input
              className="py-4 w-full "
              placeholder="Enter CTA (call to action Link)"
              onChange={handleChange}
              name="ctaLink"
              value={ctaLink}
            />
            {errors && errors.ctaLink && (
              <span className="text-red-500 mt-1 text-sm font-medium">
                {errors.ctaLink}
              </span>
            )}
          </div>
        </Grid>

        {/* <Hero hero={hero} /> */}
      </ColumnSection>
    </>
  );
};
