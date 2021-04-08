import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const { id, siteId } = router.query;
  return (
    <div>
      view page for id: {id} of site {siteId}
    </div>
  );
};
export default index;
