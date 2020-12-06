import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Donut from '../charts/Donut';

type StatType = {
  title: string;
  stats: any[];
};

type FilterProps = { generatedStats: StatType[] };

const Filter: NextPage<FilterProps> = ({ generatedStats }) => {
  const { query } = useRouter();
  return (
    <div>
      <h1>Stats by {query.filter}</h1>
      <ul>
        {generatedStats.map((stat: StatType, index: number) => (
          <li key={index}>
            <Donut label={stat.title} data={stat.stats} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const stats = (await import(`../stats/${query.filter}`)).default;
  const generatedStats = await stats();

  return { props: { generatedStats } };
};

export default Filter;
