import { NextPage } from 'next';
import styled from 'styled-components';

import { Fighter } from '../../types';

type TableProps = { rows: Fighter[] };

const BiggestFightersTable: NextPage<TableProps> = ({ rows }) => (
  <tbody>
    {rows.map((row: Fighter, i: number) => (
      <TableRow key={i}>
        <TableCell>{row.division}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.height}</TableCell>
        <TableCell>{row.reach}</TableCell>
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

export default BiggestFightersTable;