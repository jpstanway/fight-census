import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styled from 'styled-components';

import StatChart from '../charts/StatChart';
import ShortTable from '../components/Common/Tables/ShortTable';

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
        {generatedStats.map((stat, i) => {
          if (stat.type === 'table') {
            return (
              <StatContainer key={i}>
                <StatTitle>{stat.title}</StatTitle>
                <ShortTable headers={stat.labels} rows={stat.stats} />
              </StatContainer>
            );
          } else {
            return (
              <StatContainer key={i}>
                <StatChart 
                  type={stat.type} 
                  title={stat.title} 
                  labels={stat.labels} 
                  data={stat.stats} 
                />
              </StatContainer>
            );
          }
        })} 
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const stats = (await import(`../stats/${query.filter}`)).default;
  const generatedStats = await stats();

  return { props: { generatedStats } };
};

const StatTitle = styled.p`
  text-align: center;
`;

const StatContainer = styled.li`
  margin-bottom: 10rem;
`;

export default Filter;
