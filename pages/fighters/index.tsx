import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import styled from "styled-components";
import { Fighter } from "../../types/types";

const Fighters = () => {
  const { data, error } = useSWR(`/api/fighters`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <FightersList>
      {data.fighters.map((fighter: Fighter) => (
        <li key={fighter.id}>{fighter.name}</li>
      ))}
    </FightersList>
  );
};

const FightersList = styled.ul`
  list-style-type: none;
`;

export default Fighters;
