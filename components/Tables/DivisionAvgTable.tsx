import { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
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
type CellProps = { readonly isHigher: boolean };

const DivisionAvgTable: NextPage<TableProps> = ({ rows }) => (
  <tbody>
    {rows.map((row: Stat, i: number) => {
      if (row.champion && row.championAvg) {
        const isHigher = row.championAvg > row.avg;

        return (
          <React.Fragment key={i}>
            <TableRow>
              <TableCell rowSpan="2">{row.division}</TableCell>
              <TableCellFlex isHigher={isHigher}>
                <span>{row.champion}</span>
                <span>
                  <Image src={`/arrow-${isHigher ? "up" : "down"}-24px.svg`} width={24} height={24} /> 
                  {row.championAvg} inches
                </span>
              </TableCellFlex>
            </TableRow>
            <TableRow>
              <TableCellFlex isHigher={!isHigher}>
                <span>Division Avg.</span>
                <span>{row.avg} inches</span>
              </TableCellFlex>
            </TableRow>
          </React.Fragment>
        );
      }
    })}
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

const TableCellFlex = styled(TableCell)<CellProps>`
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.isHigher ? "700" : "400"};

  span {
    display: flex;
    align-items: center;
  }
`;

export default DivisionAvgTable;