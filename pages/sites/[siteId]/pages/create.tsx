import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import AddNewPage from '../../../../components/site/AddNewPage';
import Layout from '../../../../layouts/Dashboard';

const index = ({ token }) => {
  const router = useRouter();
  const { siteId } = router.query;

  return (
    <Layout>
      <AddNewPage siteId={siteId} token={token} />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);
  return { props: { token: session?.idToken } };
}

export default withPageAuthRequired(index);
