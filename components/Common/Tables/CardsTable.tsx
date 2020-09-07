import Link from "next/link";
import { Card as CardType } from "../../../types/types";

import modifyLink from "../../../utils/modifyLink";

type TableProps = {
  rows: CardType[];
};

const CardsTable: React.FC<TableProps> = ({ rows }) => (
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
      {rows.map((card: CardType) => (
        <tr key={card.id}>
          <td>
            <Link href={modifyLink(card.link, "cards")}>
              <a>{card.title}</a>
            </Link>
          </td>
          <td>{card.date}</td>
          <td>{card.city} </td>
          <td>{card.country}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CardsTable;
