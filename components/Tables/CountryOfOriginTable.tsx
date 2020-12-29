import { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';

type Stat = {
  country: string;
  count: number;
};

type TableProps = { rows: Stat[] };

const CountryOfOriginTable: NextPage<TableProps> = ({ rows }) => {
  return (
    <tbody>
      {rows.map((row, i) => (
        <TableRow key={i}>
          <TableCell>{row.country}</TableCell>
          <TableCell>{row.count}</TableCell>
        </TableRow>
      ))}
    </tbody>
  );
};

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

const TableCell = styled.td`
  border: none;

  &:not(:last-child) {
    border-right: 1px solid rgba(224, 224, 224, 1);
  }
`;

const TableCellFlex = styled(TableCell)`
  display: flex;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;
  }
`;

export default CountryOfOriginTable;