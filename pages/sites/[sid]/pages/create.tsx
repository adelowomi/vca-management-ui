import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const { sid } = router.query;
  return <div>Create page for site: {sid}</div>;
};

export default index;
