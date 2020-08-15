import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import styled from "styled-components";
import { Stat } from "../../types/types";

const Stats = () => {
  const { data, error } = useSWR(`/api/stats`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>All Stats</h1>
      <StatsList>
        {data.stats.map((stat: Stat) => (
          <li key={stat.id}>{stat.stat}</li>
        ))}
      </StatsList>
    </div>
  );
};

const StatsList = styled.ul`
  list-style-type: none;
`;

export default Stats;
