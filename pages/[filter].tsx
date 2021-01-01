import { NextPage, GetServerSideProps } from "next";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from "next/router";
import styled from 'styled-components';

import StatChart from '../charts/StatChart';
import StatTable from '../components/Common/Tables/StatTable';

type FilterProps = { 
  generatedStats: {
    stats: any[];
    next: string;
  } 
};

type SingleProps = { readonly color: string };

const Filter: NextPage<FilterProps> = ({ generatedStats }) => {
  if (!generatedStats) return <div>404 Not Found</div>;
  const { query } = useRouter();

  return (
    <div>
      <h1>Stats by {query.filter}</h1>
      <ul>
        {generatedStats.stats.map((stat, i) => {
          if (stat.type === 'table') {
            const Component: any = dynamic(() => import(`../components/Tables/${stat.component}`));
            return (
              <StatContainer key={i}>
                <StatTitle>{stat.title}</StatTitle>
                <StatTable headers={stat.labels}>
                  <Component rows={stat.stats} />
                </StatTable>
              </StatContainer>
            );
          } else if (stat.type === 'single') {
            return (
              <StatContainer key={i}>
                <StatTitle>{stat.title}</StatTitle>
                <SingleStat color={stat.color}>
                  {stat.stats[0]}
                </SingleStat>
                <SubText>{stat.labels[0]}</SubText>
              </StatContainer>
            );
          } else {
            return (
              <StatContainer key={i}>
                <StatChart 
                  id={stat.id}
                  type={stat.type} 
                  title={stat.title} 
                  labels={stat.labels} 
                  data={stat.stats} 
                  query={query.toString()}
                  options={stat.options}
                />
              </StatContainer>
            );
          }
        })} 
      </ul>
      <LinkContainer>
        <Link href={generatedStats.next}>
          <a>Next: Stats by {generatedStats.next.replace(/\//, "")}</a>
        </Link>
      </LinkContainer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const stats = (await import(`../stats/${query.filter}`)).default;
    let generatedStats = await stats();

    if (!generatedStats) generatedStats = null;

    return { props: { generatedStats } };
  } catch (error) {
    throw new Error(error);
  }
};

const StatTitle = styled.p`
  font-size: 2rem;
  text-align: center;
`;

const SingleStat = styled.p<SingleProps>`
  color: ${(props) => props.color && props.theme.colors[props.color]};
  font-size: 10rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
`;

const SubText = styled.p`
  font-style: italic;
  text-align: center;
  margin: 0;
  font-size: 1.6rem;
`;

const StatContainer = styled.li`
  margin-bottom: 10rem;
`;

const LinkContainer = styled.div`
  margin-top: 5rem;
  text-align: center;

  a {
    font-size: 2rem;
  }
`;

export default Filter;
