import { useRouter } from "next/router";

const Rankings = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div>
      <h1>{pid} Rankings</h1>
    </div>
  );
};

export default Rankings;
