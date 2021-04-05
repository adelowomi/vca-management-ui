import { useRouter } from 'next/router';

import AddNewPage from '../../../../components/site/AddNewPage';
import Layout from '../../../../layouts/Dashboard';

const index = (props) => {
  const {
    sites: {
      data: { sites },
    },
  } = props;
  const router = useRouter();
  // const { sid } = router.query;
  // console.log(sites);

  return (
    <Layout>
      <AddNewPage siteId={sites[0].id} />
    </Layout>
  );
};

export default index;
