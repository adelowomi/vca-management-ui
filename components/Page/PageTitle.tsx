import React, { ChangeEvent } from 'react';

import { ErrorProps } from '../../types/interfaces';
import FormSelect from '../FormSelect/VcaSelect';
import { Input, Label } from './PageInput';
import { FormGroup, RowSection } from './PageStyledElements';

export interface PageTitleProps {
  pageTitle: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, data?: any, field?: string) => void;
  errors: ErrorProps;
  menuItem: string;
  options: any[];
  availableMenuItems: any[];
}

export const PageTitle: React.FC<PageTitleProps> = ({
  handleChange,
  pageTitle,
  errors,
  menuItem,
  options,
  availableMenuItems,
}) => {

  
  const selectableMenuItems = [
    ...availableMenuItems,
    {
      name: options.filter((item) => item.id == menuItem)[0].name,
      id: options.filter((item) => item.id == menuItem)[0].id,
    },
  ];
  return (
    <>
      <RowSection className="space-x-7 mt-10">
        <FormGroup className="">
          <Label htmlFor="pageTitle" className="mb-7">
            Page Title
          </Label>
          <Input
            onChange={handleChange}
            name="pageTitle"
            value={pageTitle}
            placeholder="ex: Home"
            className="pl-5"
            style={{ padding: '1rem' }}
          />
          {errors && errors.pageTitle && (
            <span className="text-red-500 mt-1">{errors.pageTitle}</span>
          )}
        </FormGroup>
        <FormGroup className="">
          {/* <Label htmlFor="pageTitle" className="flex mb-6 ">
            Add menu to page
            <span className="ml-2"></span>
            <RiQuestionFill className="h-6 w-6 text-black" />
          </Label> */}
          <FormSelect
            defaultOption={{
              id: 0,
              name: options.filter(m => m.id == menuItem)[0]?.name ?? "Select Menu",
              value: options.filter(m => m.id == menuItem)[0]?.id ?? null,
              unavailable: false,
            }}
            onChange={(data) => {
              let e: ChangeEvent<HTMLInputElement>;
              handleChange(e, data.value,"menuItem");
            }}
            options={selectableMenuItems.map((item, index) => {
              return {
                value: item.id as unknown as string,
                name: item.name as unknown as string,
                id: index,
                unavailable: false,
              };
            })}
            label="Add menu to page"
            error={errors.menuItem}
            errorText={'Add page to menu'}
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
