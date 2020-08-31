import { GetServerSideProps } from "next";
import styled from "styled-components";
import { Event } from "../../types/types";

import EventsTable from "../../components/Common/Tables/EventsTable";
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
    <EventsTable rows={data.upcoming} />
    <SectionTitle>Past Cards</SectionTitle>
    <EventsTable rows={data.past} />
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
