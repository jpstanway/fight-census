import { GetServerSideProps } from "next";
import { Event } from "../../types/types";
import styled from "styled-components";
import createEventsTable from "../../utils/cards/createEventsTable";

type EventProps = {
  data: {
    upcoming: Event[];
    past: Event[];
  };
};

const Cards: React.FC<EventProps> = ({ data }) => (
  <div>
    <SectionTitle>Upcoming Cards</SectionTitle>
    <ul>
      {data.upcoming.map((event: Event) => (
        <li key={event.id}>
          {event.event} | {event.date} | {event.city} | {event.country} |{" "}
          {event.link}
        </li>
      ))}
    </ul>
    <SectionTitle>Past Cards</SectionTitle>
    <ul>
      {data.past.map((event: Event) => (
        <li key={event.id}>
          {event.event} | {event.date} | {event.city} | {event.country} |{" "}
          {event.link}
        </li>
      ))}
    </ul>
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const upcoming = await createEventsTable("7");
  const past = await createEventsTable("8");
  const data = { upcoming, past };

  return { props: { data } };
};

const SectionTitle = styled.h1`
  text-transform: capitalize;
`;

export default Cards;
