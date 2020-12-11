import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";

import StatChart from '../charts/StatChart';

type StatType = {
  type: string;
  title: string;
  labels: string[];
  stats: any[];
};

type FilterProps = { generatedStats: StatType[] };

const Filter: NextPage<FilterProps> = ({ generatedStats }) => {
  const { query } = useRouter();
  return (
    <div>
      <h1>Stats by {query.filter}</h1>
      <ul>
        {generatedStats.map((stat, i) => (
          <li key={i}>
            <StatChart 
              type={stat.type} 
              title={stat.title} 
              labels={stat.labels} 
              data={stat.stats} 
            />
          </li>
        ))}
        {/* <li>
          <Donut label={generatedStats[0].title} data={generatedStats[0].stats} />
        </li>
        <li>
          <p>{generatedStats[1].title}</p>
          <ul>
            {Object.keys(generatedStats[1].stats).map((stat: string, i: number) => (
              <li key={i}>
                {stat} - {generatedStats[1].stats[stat].name}
              </li>
            ))}
          </ul>
        </li> */}
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
