import { getSession } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import Layout from '../../../layouts/Dashboard';
const index = () => {
  const router = useRouter();
  const { siteId } = router.query;
  return <Layout>view site: {siteId}</Layout>;
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

  return { props: { user: session.user } };
}
export default index;
