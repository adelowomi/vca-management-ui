import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const { id, sid } = router.query;
  return (
    <div>
      view page for id: {id} of site: {sid}
    </div>
  );
};
export default index;
