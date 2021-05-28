import React, { Fragment } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import styled from 'styled-components';

const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* width: 20rem; */
  border: 1px solid #828282;
  background: #fff;
`;
const Select = styled.select`
  optgroup {
    background-color: #fff !important;
    color: #fff;
    margin-top: 50rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectButton = ({
  name,
  py,
  px,
  handleChange,
  value,
  options,
  caption,
}) => {
  return (
    <Container>
      <DivWrapper className={`py-${py} px-${px}`}>
        <Select
          name={name}
          id={name}
          className="text-gray-600  pl-1 font-semibold bg-white appearance-none focus:outline-none text-sm w-full  outline-none"
          onChange={handleChange}
          value={value}
        >
          <option value="">{caption}</option>
          {options.map((el) => (
            <Fragment key={el.id}>
              <option value={el.id}>{el.name}</option>
            </Fragment>
          ))}
        </Select>
        <div className="border-l border-gray-400 h-6 flex">
          <span className="pl-2 text-gray-600">
            <RiArrowDownSLine className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
      </DivWrapper>
      {/* <div className="shadow w-full h-full bg-white">hellonkbnn m m ;</div> */}
    </Container>
  );
};
