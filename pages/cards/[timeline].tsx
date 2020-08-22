import { useRouter } from "next/router";
import fetcher from "../../utils/fetcher";
import styled from "styled-components";
import { Event } from "../../types/types";
import createEventTable from "../../utils/createEventTable";

interface DataProps {
  data: Event[];
}

const Cards = (props: DataProps) => {
  const { query } = useRouter();

  return (
    <div>
      <PageTitle>{query.timeline} Cards</PageTitle>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.venue}</td>
              <td>{event.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = async () => {
  const searchParams = new URLSearchParams({
    origin: "*",
    action: "parse",
    page: "List_of_UFC_events",
    format: "json",
    prop: "wikitext",
    section: "3",
  });

  const url = `https://en.wikipedia.org/w/api.php?${searchParams}`;

  const json = await fetcher(url);
  const data = createEventTable(json);

  return { props: { data } };
};

const PageTitle = styled.h1`
  text-transform: capitalize;
`;

export default Cards;
