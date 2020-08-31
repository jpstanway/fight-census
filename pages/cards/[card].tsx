import { GetServerSideProps } from "next";
import { Event } from "../../types/types";
import styled from "styled-components";
import getEvent from "../../utils/cards/getEvent";

type EventProps = {
  data: Event;
};

const Card: React.FC<EventProps> = ({ data }) => (
  <div>
    <SectionTitle>Card</SectionTitle>
    <ul>
      {data.map((fight) => (
        <li key={fight.id}>
          {fight.division} |{" "}
          {`${fight.fighters[0]} ${fight.fighters[1]} ${fight.fighters[2]}`}
          {fight.outcome
            ? ` | Result: ${fight.outcome[0]} Round: ${fight.outcome[1]} Time: ${fight.outcome[2]}`
            : null}
        </li>
      ))}
    </ul>
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { card } = query;
  const data = await getEvent(card);

  return { props: { data } };
};

const SectionTitle = styled.h1`
  text-transform: capitalize;
`;

export default Card;
