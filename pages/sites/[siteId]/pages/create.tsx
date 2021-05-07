import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import CreatePage from '../../../../components/Page/create/CreatePage';
import { GET_SITE_MENUITEMS } from '../../../../graphql/schema';
import Layout from '../../../../layouts/Dashboard';
import { createApolloClient } from '../../../../lib/apollo';

const index = ({ token, menuItems }) => {
  const router = useRouter();
  const { siteId } = router.query;

  return (
    <Layout>
      <CreatePage siteId={siteId} token={token} menuItems={menuItems} />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);

  const client = createApolloClient(session?.idToken);

  const {
    data: {
      siteMenuItems: {
        header: { menuItems },
      },
    },
  } = await client.query({
    query: GET_SITE_MENUITEMS,
    variables: {
      filter: {
        combinedFilter: {
          filters: [
            {
              singleFilter: {
                field: 'siteId',
                operator: 'EQ',
                value: ctx.query.siteId,
              },
            },
          ],
        },
      },
    },
  });
  return { props: { token: session?.idToken, menuItems } };
}

export default withPageAuthRequired(index);
