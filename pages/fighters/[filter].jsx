import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import styled from "styled-components";

const FightersBy = () => {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.filter && `/api/fighters/${query.filter}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const countries = Object.keys(data);

  return (
    <div>
      <h1>Fighters {query.filter}</h1>
      {countries.map((country) => {
        return (
          <div>
            <h2>{country}</h2>
            <FighterList>
              {data[country].map((fighter) => (
                <li>{fighter.name}</li>
              ))}
            </FighterList>
          </div>
        );
      })}
    </div>
  );
};

const FighterList = styled.div`
  list-style-type: none;
`;

export default FightersBy;
