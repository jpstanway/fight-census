import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import styled from "styled-components";

const Cards = () => {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.timeline && `/api/cards/${query.timeline}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.timeline} Cards</h1>
      <CardsList>
        {data.cards.map((card) => (
          <li key={card.id}>
            {card.date} / {card.event} / {card.location}
          </li>
        ))}
      </CardsList>
    </div>
  );
};

const CardsList = styled.ul`
  list-style-type: none;
`;

export default Cards;
