import { useRouter } from "next/router";

const Cards = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div>
      <h1>{pid} Cards</h1>
    </div>
  );
};

export default Cards;
