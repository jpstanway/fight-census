import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import styled from "styled-components";
import { Division } from "../../types/types";

const Rankings = () => {
  const { query } = useRouter();
  const { data, error } = useSWR<Division, any>(
    () => query.division && `/api/rankings/${query.division}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.division} Rankings</h1>
      <RankingsList>
        {data.rankings.map((fighter) => (
          <li key={fighter.id}>
            {fighter.rank}. {fighter.name} | {fighter.wins}-{fighter.losses}
          </li>
        ))}
      </RankingsList>
    </div>
  );
};

const RankingsList = styled.ul`
  list-style-type: none;
`;

export default Rankings;
