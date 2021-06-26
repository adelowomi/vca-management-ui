import React from 'react';
import { RiQuestionFill } from 'react-icons/ri';

import { ErrorProps } from '../../types/interfaces';
import { SelectButton } from './PageButtons/SelectButton';
import { Input, Label } from './PageInput';
import { FormGroup, RowSection } from './PageStyledElements';

export interface PageTitleProps {
  pageTitle: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: ErrorProps;
  menuItem: string;
  options: any;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  handleChange,
  pageTitle,
  errors,
  menuItem,
  options,
}) => {
  return (
    <>
      <RowSection className="space-x-7 mt-10">
        <FormGroup className="">
          <Label htmlFor="pageTitle" className="mb-6">
            Page Title
          </Label>
          <Input
            onChange={handleChange}
            name="pageTitle"
            value={pageTitle}
            placeholder="ex: Home"
            className="py-4"
          />
          {errors && errors.pageTitle && (
            <span className="text-red-500 mt-1">{errors.pageTitle}</span>
          )}
        </FormGroup>
        <FormGroup className="">
          <Label htmlFor="pageTitle" className="flex mb-6 ">
            Add menu to page
            <span className="ml-2"></span>
            <RiQuestionFill className="h-6 w-6 text-black" />
          </Label>
          <SelectButton
            caption="Select menu"
            py={4}
            px={5}
            handleChange={handleChange}
            value={menuItem}
            options={options}
            name="menuItem"
          />
          {errors && errors.menuItem && (
            <span className="text-red-500 mt-1 text-sm font-medium">
              {errors.menuItem}
            </span>
          )}
        </FormGroup>
      </RowSection>
    </>
  );
};
