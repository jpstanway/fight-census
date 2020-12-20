import { NextPage } from 'next';
import styled from 'styled-components';

type Stat = {
  [key: string]: {
    division: string;
    total: number;
    count: number;
    avg: number;
    champion: string;
    championAvg: number;
  }
};

type TableProps = { rows: Stat[] };

const WinnerBySizeTable: NextPage<TableProps> = ({ rows }) => (
  <tbody>
    {rows.map((row: Stat, i: number) => (
      <TableRow key={i}>
        <TableCell>{row.division}</TableCell>
        <TableCell>{row.champion}</TableCell>
        <TableCell>{row.championAvg}</TableCell>
        <TableCell>{row.avg}</TableCell>
      </TableRow>
    ))}
  </tbody>
);

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

const TableCell = styled.td`
  border: none;
`;

export default WinnerBySizeTable;