import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
// import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import Layout from '../../../../components/Layout/Layout';
// import { GET_SITE_MENUITEMS } from '../../../../graphql';
// import { createApolloClient } from '../../../../lib/apollo';

interface IbtnProps {
  color: string;
  $bg: string;
  $px?: string;
}
interface IheaderTypeBtn {
  active?: boolean;
}
const Container = tw.div`
px-20
`;

const RowSection = tw.div`
flex
flex-row
`;

const ColumnSection = tw.div`
mt-8
flex
flex-col
`;
const H1 = tw.h1`
font-bold
text-3xl
`;
const H2 = tw.h1`

text-xl font-semibold
`;

const Btn = styled.button<IbtnProps>`
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

const Input = styled.input`
  border: 1px solid #828282;
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  align-content: center;
  text-align: left;
  outline: none;

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
  }
  :focus {
    /* outline: none; */
    /* outline-color: #1890ff; */
  }
`;
const Label = styled.label`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #333333;
`;

const FormGroup = styled.div`
  width: 24rem;
  display: flex;
  flex-direction: column;
`;

const HeaderTypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 49.5rem;
`;
const HeaderTypeBtn = styled.button<IheaderTypeBtn>`
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
const ShadowBtn = styled.button`
  background-color: #e8f4ff;
  border-radius: 2px;
  color: #1890ff;
  display: flex;
  justify-content: center;
  text-align: center;
  :focus {
    outline: none;
  }
`;
const ImageSelectBox = styled.div`
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
const HeaderPositionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
`;
const index = () => {
  return (
    <Layout>
      <Container>
        <RowSection className="justify-between">
          <H1>Add a new page</H1>
          <div className="flex flex-row justify-start space-x-5">
            <Btn color="primary" $bg="secondary" $px="sm">
              Cancel
            </Btn>

            <Btn color="secondary" $bg="primary" $px="lg">
              Save & Publish
            </Btn>
          </div>
        </RowSection>
        <RowSection className="space-x-7 mt-10">
          <FormGroup className="">
            <Label htmlFor="pageTitle" className="mb-6">
              Page Title
            </Label>
            <Input
              placeholder="ex: Home"
              className="py-4 px-17 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </FormGroup>
          <FormGroup className="">
            <Label htmlFor="pageTitle" className="flex mb-6 ">
              Add menu to page
              <span className="ml-2"></span>
              <QuestionMarkCircleIcon className="h-6 w-6 text-black" />
            </Label>
            <Input
              className="py-4 px-17 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Select menu"
            />
          </FormGroup>
        </RowSection>
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <ColumnSection>
          <H2 className="mb-6">1. Hero Type</H2>
          <HeaderTypeWrapper>
            <HeaderTypeBtn>Header Type 1</HeaderTypeBtn>
            <HeaderTypeBtn active={true}>Header Type 2</HeaderTypeBtn>
            <HeaderTypeBtn>Header Type 3</HeaderTypeBtn>
            <HeaderTypeBtn>Header Type 4</HeaderTypeBtn>
          </HeaderTypeWrapper>
          <H2 className="mt-6">Media Image</H2>
          <ImageSelectBox className="mt-5 w-96 flex items-center justify-center cursor-pointer">
            <p>+ Select from media gallery</p>
          </ImageSelectBox>
        </ColumnSection>

        <ColumnSection>
          <HeaderPositionWrapper>
            <div className="flex flex-col w-full">
              <H2 className="mb-5">Header Text</H2>
              <div className="w-full">
                <Input className="py-4 w-96 " placeholder="Enter text" />
              </div>
            </div>
            <div className="flex flex-col w-full ml-6">
              <H2 className="mb-5">Text Position</H2>
              <div className="flex flex-row justify-between space-x-3">
                <HeaderTypeBtn className="">Left</HeaderTypeBtn>
                <HeaderTypeBtn active={true}>Right</HeaderTypeBtn>
                <HeaderTypeBtn>Centre</HeaderTypeBtn>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <H2 className="mb-4 mt-6">Caption Text</H2>
              <div className="w-full">
                <Input className="py-4 w-96 " placeholder="Enter text" />
              </div>
            </div>
          </HeaderPositionWrapper>
        </ColumnSection>
        <ColumnSection>
          <Grid className="space-x-5">
            <div className="flex flex-col w-full">
              <H2 className="mb-5">Call to action button</H2>
              <div className="w-full">
                <Input className="py-4 w-72 " placeholder="Inactive" />
              </div>
            </div>

            <div className="w-full mt-12">
              <Input className="py-4 w-72 " placeholder="Action Text" />
            </div>

            <div className="w-full mt-12">
              <Input
                className="py-4 w-full "
                placeholder="Enter CTA (call to action Link)"
              />
            </div>
            <div className="mt-5">
              <ShadowBtn className="py-4 px-10 shadow-sm rounded text-sm -ml-5 font-bold">
                Preview body
              </ShadowBtn>
            </div>
          </Grid>
        </ColumnSection>
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <ColumnSection>
          <Grid className="space-x-5">
            <div className="flex flex-col w-full">
              <H2 className="mb-5">Widget section</H2>
              <div className="w-full">
                <Input className="py-4 w-72" placeholder="Add a title" />
              </div>
            </div>

            <div className="w-full mt-12">
              <Input className="py-4 w-72 " placeholder="Description" />
            </div>

            <div className="w-full mt-12">
              <ImageSelectBox className="flex w-full items-center justify-center cursor-pointer">
                <p>+ Add posts</p>
              </ImageSelectBox>
            </div>
            <div className="mt-5">
              <ShadowBtn className="py-4 px-10 shadow-sm rounded text-sm -ml-5 font-bold">
                Preview body
              </ShadowBtn>
            </div>
          </Grid>
        </ColumnSection>
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <ColumnSection>
          <H2 className="mt-4">3. Post section</H2>
          <ImageSelectBox className="mt-5 w-96 flex items-center justify-center cursor-pointer">
            <p>+ Add posts</p>
          </ImageSelectBox>
          <div className="mt-5">
            <ShadowBtn className="py-4 px-10 shadow-sm rounded text-sm font-bold">
              Preview body
            </ShadowBtn>
          </div>
        </ColumnSection>
        <hr className="border-gray-400 border-5 w-full mt-8" />
        <ColumnSection>
          <div className="">
            <ShadowBtn className="py-4 px-10 shadow-sm rounded text-sm font-bold">
              Save as draft
            </ShadowBtn>
          </div>
        </ColumnSection>
      </Container>
    </Layout>
  );
};

// export async function getServerSideProps(ctx) {
//   const session = getSession(ctx.req, ctx.res);

//   const client = createApolloClient(session?.idToken);

//   const {
//     data: {
//       siteMenuItems: {
//         header: { menuItems },
//       },
//     },
//   } = await client.query({
//     query: GET_SITE_MENUITEMS,
//     variables: {
//       filter: {
//         combinedFilter: {
//           filters: [
//             {
//               singleFilter: {
//                 field: 'siteId',
//                 operator: 'EQ',
//                 value: ctx.query.siteId,
//               },
//             },
//           ],
//         },
//       },
//     },
//   });
//   return { props: { token: session?.idToken, menuItems } };
// }

export default withPageAuthRequired(index);
