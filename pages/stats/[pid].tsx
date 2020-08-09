import { useRouter } from "next/router";

const StatsBy = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div>
      <h1>Stats {pid}</h1>
    </div>
  );
};

export default StatsBy;
