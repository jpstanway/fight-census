import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import styled from "styled-components";
import { Stat, Stats } from "../../types/types";

const StatsBy = () => {
  const { query } = useRouter();
  const { data, error } = useSWR<Stats, any>(
    () => query.filter && `/api/stats/${query.filter}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Stats {data.name}</h1>
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

export default StatsBy;
