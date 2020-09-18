import Link from "next/link";
import { Card as CardType } from "../../../types/types";

import createLink from "../../../utils/createLink";

type TableProps = {
  rows: CardType[];
};

const CardsTable: React.FC<TableProps> = ({ rows }) => (
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Date</th>
        <th>Venue</th>
        <th>City</th>
        <th>Country</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((card: CardType) => (
        <tr key={card.id}>
          <td>
            <Link href={`/cards/${createLink(card.link, card.title)}`}>
              <a>{card.title}</a>
            </Link>
          </td>
          <td>{card.date}</td>
          <td>{card.venue}</td>
          <td>{card.city} </td>
          <td>{card.country}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CardsTable;
