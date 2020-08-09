import { useRouter } from "next/router";

const FightersBy = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div>
      <h1>Fighters {pid}</h1>
    </div>
  );
};

export default FightersBy;
