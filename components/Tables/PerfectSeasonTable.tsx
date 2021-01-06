import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

type Stat = {
  name: string;
  count: number;
};

type TableProps = { rows: Stat[] };

const PerfectSeasonTable: NextPage<TableProps> = ({ rows }) => (
  <tbody>
    {rows.map((row: Stat, i: number) => (                                         
        <TableRow key={i}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.count}</TableCell>
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

  &:not(:last-child) {
    border-right: 1px solid rgba(224, 224, 224, 1);
  }
`;

export default PerfectSeasonTable;