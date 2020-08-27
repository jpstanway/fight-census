import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Event } from "../../types/types";
import styled from "styled-components";
import fetcher from "../../utils/fetcher";
import createEventTable from "../../utils/createEventTable";

interface DataProps {
  data: Event[];
}

const Cards = (props: DataProps) => {
  const { query } = useRouter();

  return (
    <div>
      <PageTitle>{query.timeline} Cards</PageTitle>
      <ul>
        {props.data.map((event: Event) => (
          <li key={event.id}>
            {event.event} | {event.date} | {event.city} | {event.country} |{" "}
            {event.link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const year = new Date().getFullYear();
  const { timeline } = query;
  const section = timeline === "upcoming" ? "7" : "8";

  const searchParams = new URLSearchParams({
    origin: "*",
    action: "parse",
    page: `${year.toString()}_in_UFC`,
    format: "json",
    prop: "text",
    section,
  });

  const url = `https://en.wikipedia.org/w/api.php?${searchParams}`;
  const json = await fetcher(url);
  const data = createEventTable(json, timeline);

  return { props: { data } };
};

const PageTitle = styled.h1`
  text-transform: capitalize;
`;

export default Cards;
