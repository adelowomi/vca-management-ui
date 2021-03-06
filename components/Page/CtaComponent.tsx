import * as React from 'react';
import { ChangeEvent } from 'react';

import { ErrorProps } from '../../types/interfaces';
import FormSelect from '../FormSelect/VcaSelect';
import { Input } from './PageInput';
import { ColumnSection, Grid, H2 } from './PageStyledElements';

export interface CallToActionProps {
  actionText: string;
  ctaLink: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, data?: any,field?:string) => void;
  hasAction?: boolean | string;
  errors: ErrorProps;
}

const options = [
  { id: 'false', name: 'Inactive', value: 'INACTIVE', unavailable: false },
  { id: 'true', name: 'active', value: 'ACTIVE', unavailable: false },
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
            <H2 className="">Call to action button</H2>
            <div className="w-full -mt-0.5">
              <FormSelect
                defaultOption={{
                  id: 0,
                  name: hasAction && hasAction ? 'Active' : "inActive" ?? "Select state",
                  value: hasAction && hasAction as unknown as string || "false",
                  unavailable: false,
                }}
                onChange={(data) => {
                  let e: ChangeEvent<HTMLInputElement>;
                  handleChange(e, data.value as unknown as boolean,"hasAction");
                }}
                options={options.map((item, index) => {
                  return {
                    value: item.id as unknown as string,
                    name: item.name as unknown as string,
                    id: index,
                    unavailable: false,
                  };
                })}
                label=""
                error={errors.hasAction}
                errorText={'Add page to menu'}
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
