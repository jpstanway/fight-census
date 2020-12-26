import { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

type Stat = {
  group: string;
  stat: number;
};

type TableProps = { rows: Stat[] };
type CellProps = { readonly isHigher: boolean };

const MedianAgeTable: NextPage<TableProps> = ({ rows }) => {
    const isHigher = rows[1].stat > rows[0].stat;
    const order = isHigher ? [rows[1], rows[0]] : rows;

    return (
      <tbody>
        {order.map((row: Stat, i: number) => {
            const isChamp = row.group === "Champions";

            return (                                         
                <TableRow key={i} isHigher={isChamp && isHigher}>
                  <TableCell>{row.group}</TableCell>
                  <TableCellFlex>
                    {row.stat}
                    {isChamp && (
                      <Image 
                        src={`/arrow-${isHigher ? "up" : "down"}-24px.svg`} 
                        width={24} height={24} 
                      />
                    )}
                  </TableCellFlex>
                </TableRow>
            );
        })}
      </tbody>
    );
};

const TableRow = styled.tr<CellProps>`
  font-weight: ${(props) => props.isHigher ? "700" : "400"};

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
  align-items: center;

  span {
    display: flex;
    align-items: center;
  }
`;

export default MedianAgeTable;