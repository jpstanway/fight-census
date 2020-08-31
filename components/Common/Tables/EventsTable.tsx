import Link from "next/link";
import styled from "styled-components";
import { Event } from "../../../types/types";

import modifyLink from "../../../utils/modifyLink";

type TableProps = {
  rows: Event[];
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
      {rows.map((event: Event) => (
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
