import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";



const Filter: NextPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Stats by {query.filter}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const stats = (await import(`../stats/${query.filter}`)).default;
  
  const generatedStats = await stats();
  console.log(generatedStats);
  return { props: {} }
};

export default Filter;
