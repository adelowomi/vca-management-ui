import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const { id, sid } = router.query;
  return (
    <div>
      edit page for id: {id} for siteL {sid}
    </div>
  );
};
export default index;
