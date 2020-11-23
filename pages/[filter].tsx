import { useRouter } from "next/router";

const Filter = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Stats by {query.filter}</h1>
    </div>
  );
};

export default Filter;
