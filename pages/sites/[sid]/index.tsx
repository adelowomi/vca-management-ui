import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const { sid } = router.query;
  return <div>view site: {sid}</div>;
};
export default index;
