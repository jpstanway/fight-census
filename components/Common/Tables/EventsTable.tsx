import Link from "next/link";
import { Event as EventType } from "../../../types/types";

import modifyLink from "../../../utils/modifyLink";

type TableProps = {
  rows: EventType[];
};

const EventsTable: React.FC<TableProps> = ({ rows }) => (
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Date</th>
        <th>City</th>
        <th>Country</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((event: EventType) => (
        <tr key={event.id}>
          <td>
            <Link href={modifyLink(event.link, "cards")}>
              <a>{event.event}</a>
            </Link>
          </td>
          <td>{event.date}</td>
          <td>{event.city} </td>
          <td>{event.country}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EventsTable;
