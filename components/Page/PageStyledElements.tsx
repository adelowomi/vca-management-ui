import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export const Container = tw.div`
px-20
mt-6
`;

export const RowSection = tw.div`
flex
flex-row
`;

export const ColumnSection = tw.div`
mt-8
flex
flex-col
`;
export const H1 = tw.h1`
font-bold
text-3xl
`;
export const H2 = tw.h1`
text-xl font-semibold
`;

export const FormGroup = styled.div`
  width: 24rem;
  display: flex;
  flex-direction: column;
`;

export const HeaderTypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 49.5rem;
`;

export const ImageSelectBox = styled.div`
  /* width: 23.8rem; */
  background: rgba(24, 144, 255, 0.1);
  border: 1px dashed #1890ff;
  border-radius: 2px;
  padding: 19px;

  p {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    text-align: center;
    color: #1890ff;
  }
`;
export const HeaderPositionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
`;

export const Container2 = styled.div`
  box-sizing: border-box;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
