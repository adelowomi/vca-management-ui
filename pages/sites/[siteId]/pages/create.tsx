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

const SectionOne = tw.div`
flex
flex-row
justify-between
`;
const SectionTwo = tw.div`
mt-10
flex
flex-row
`;

const SectionThree = tw.div`
mt-8
flex
flex-col
`;

const SectionFour = tw.div`
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
  width: 100%;
  text-align: left;

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
  padding: 17px 30px;
  color: ${({ active }) => (active ? '#1890FF' : '#828282')};
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  width: 11.2rem;
  align-items: center;
  :focus {
    outline: none;
  }
`;

const HeaderPositionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const ImageSelectBox = styled.div`
  width: 23.8rem;
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

const index = () => {
  // const router = useRouter();
  // const { siteId } = router.query;

  return (
    <Layout>
      <Container>
        <SectionOne>
          <H1>Add a new page</H1>
          <div className="flex flex-row justify-start space-x-5">
            <Btn color="primary" $bg="secondary" $px="sm">
              Cancel
            </Btn>

            <Btn color="secondary" $bg="primary" $px="lg">
              Save & Publish
            </Btn>
          </div>
        </SectionOne>
        <SectionTwo className="space-x-7">
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
              <QuestionMarkCircleIcon className="h-6 w-6" />
            </Label>
            <Input
              className="py-4 px-17 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Select menu"
            />
          </FormGroup>
        </SectionTwo>
        <hr className="border-gray-400 border--5 w-full mt-8" />
        <SectionThree>
          <H2 className="mb-6">1. Hero Type</H2>
          <HeaderTypeWrapper>
            <HeaderTypeBtn>Header Type 1</HeaderTypeBtn>
            <HeaderTypeBtn active={true}>Header Type 2</HeaderTypeBtn>
            <HeaderTypeBtn>Header Type 3</HeaderTypeBtn>
            <HeaderTypeBtn>Header Type 4</HeaderTypeBtn>
          </HeaderTypeWrapper>
          <H2 className="mt-6">Media Image</H2>
          <ImageSelectBox className="mt-5 flex items-center justify-center cursor-pointer">
            <p>+ Select from media gallery</p>
          </ImageSelectBox>
        </SectionThree>

        <SectionFour>
          <HeaderPositionWrapper></HeaderPositionWrapper>
        </SectionFour>
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
