import { getSession } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
// import moment from 'moment';
// import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import Layout from '../../../../components/Layout/Layout';
import { BulkActionDropdown } from '../../../../components/Page/Create/BulkActionDropdown';
// import { PAGES_QUERY } from '../../../../graphql';
// import { createApolloClient } from '../../../../lib/apollo';
interface Iprops {
  $big: boolean;
}

const PageActionsWrapper = tw.div`
flex
flex-col
`;

const PageActionsColOne = tw.div`
flex
flex-row
justify-between
items-center
`;

const Btn = styled.button`
  background-color: #1890ff;
  border-radius: 4px;
  box-shadow: rgba(128, 128, 128, 0.1);
`;

const PageActionsColOneBtn = tw(Btn)`
text-white
text-sm
py-3
font-bold
px-7
`;

const PageHeroWrapper = tw.div``;
const PageTableWrapper = tw.div``;

const Pages = () => {
  // const count = 0;
  // const [dropdown, setDropdown] = React.useState(false);
  // const dropdownClick = () => setDropdown(!dropdown);
  return (
    <Layout>
      <PageActionsWrapper>
        <PageActionsColOne>
          <h1 className="text-4xl font-semibold">Pages</h1>
          <PageActionsColOneBtn>Add New</PageActionsColOneBtn>
        </PageActionsColOne>
        <div className=" flex mt-7">
          <BulkActionDropdown />
        </div>
      </PageActionsWrapper>
      <PageHeroWrapper></PageHeroWrapper>
      <PageTableWrapper></PageTableWrapper>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  // const client = createApolloClient(session.idToken);

  // const {
  //   data: { pages },
  // } = await client.query({
  //   query: PAGES_QUERY,
  //   variables: {
  //     filter: {
  //       combinedFilter: {
  //         filters: [
  //           {
  //             singleFilter: {
  //               field: 'siteId',
  //               operator: 'EQ',
  //               value: ctx.query.siteId,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   },
  // });

  // return { props: { pages } };
  return { props: {} };
}

export default withPageAuthRequired(Pages);
