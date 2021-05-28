import styled from 'styled-components';
export const Input = styled.input`
  border: 1px solid #828282;
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  align-content: center;
  text-align: left;
  outline: none;
  padding-left: 15px;

  ::placeholder {
    padding-left: 6px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    color: #828282;
    text-align: left;
    padding-left: 10px;
    z-index: 10;
  }
  :focus {
    border: #fff;
    padding-left: 15px;
    text-align: left;
    ::placeholder {
      color: #fff;
    }
  }
`;

export const Label = styled.label`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #333333;
`;
