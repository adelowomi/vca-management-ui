import styled from 'styled-components';

import theme from '../../styles/theme';

interface ButtonProps {
  width?: string;
  isLink?: boolean;
}

export const Button = styled.button`
  height: 50px;
  width: ${(props: ButtonProps) => (props.width ? props.width : '100%')};
  margin: 8px 0px;
  border: none;
  border-radius: 5px;
  font-size: ${(props: ButtonProps) => (props.isLink ? '14px' : '17px')};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.71px;
  text-align: ${(props: ButtonProps) => (props.isLink ? 'start' : 'center')};
  background: ${(props: ButtonProps) => (props.isLink ? 'none' : '#0035c1')};
  color: ${(props: ButtonProps) =>
    props.isLink ? `${theme.colors.blue}` : `${theme.colors.white}`};
  cursor: pointer;
  :disabled {
    background: lightgray;
  }
`;

export const PrimaryButton = styled.button`
  color: ${(props) =>
    props.theme.colors ? props.theme.colors.button.primary.font : 'red'};
  background: ${(props) =>
    props.theme.colors ? props.theme.colors.button.primary.background : 'red'};
  &:hover {
    background-color: ${(props) =>
      props.theme.colors ? props.theme.colors.button.primary.hoverBG : 'red'};
    color: ${(props) =>
      props.theme.colors ? props.theme.colors.button.primary.hoverFont : 'red'};
  }
`;
