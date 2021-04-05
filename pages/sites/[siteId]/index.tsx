import { useRouter } from 'next/router';

import Layout from '../../../layouts/Dashboard';
const index = () => {
  const router = useRouter();
  const { siteId } = router.query;
  return <Layout>view site: {siteId}</Layout>;
};
export default index;
