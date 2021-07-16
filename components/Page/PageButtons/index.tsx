import styled from 'styled-components';

interface IheaderTypeBtn {
  active?: boolean;
}
export const HeaderTypeBtn = styled.button<IheaderTypeBtn>`
  border: ${({ active }) =>
    active ? '2px solid #1890FF' : '1px solid #828282'};
  box-sizing: border-box;
  border-radius: 2px;
  background: ${({ active }) => (active ? 'rgba(24, 144, 255, 0.1)' : '#fff')};
  padding: 17px 0px;
  color: ${({ active }) => (active ? '#1890FF' : '#828282')};
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  width: 11.2rem;
  display: flex;
  justify-content: center;
  text-align: center;
  :focus {
    outline: none;
  }
`;

// Action button
interface IbtnProps {
  color: string;
  $bg: string;
  $px?: string;
}
export const Btn = styled.button<IbtnProps>`
  color: ${(p) => (p.color === 'primary' ? '#828282' : '#fff')};
  background: ${(p) => (p.$bg === 'primary' ? '#1890FF' : '#d7d9da')};
  padding: ${(p) => (p.$px === 'sm' ? '15px 25px ' : '15px 25px')};
  border-radius: 2px;
  box-shadow: rgba(128, 128, 128, 0.1);
  font-weight: 600;
  font-size: 13px;
  :focus {
    outline: none;
  }
`;
type ShowBtnProps = {
  bg?: string;
};
export const ShadowBtn = styled.button<ShowBtnProps>`
  background-color: #e8f4ff;

  background: ${({ bg }) => (bg === 'primary' ? '#1890FF' : '#e8f4ff')};
  color: ${({ bg }) => (bg === 'primary' ? '#fff' : '#1890FF')};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  text-align: center;
  :focus {
    outline: none;
  }
`;
