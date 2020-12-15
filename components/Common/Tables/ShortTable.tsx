import { NextPage } from 'next';
import styled from 'styled-components';

type TableProps = {
  headers: string[];
  rows: any;
}

const ShortTable: NextPage<TableProps> = ({ headers, rows }) => (
  <Container>
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header, i) => (
            <TableHeader key={i}>{header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {rows.map((row: any, i: number) => (
          <TableRow key={i}>
            <TableCell>
              {row.division}
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.height}</TableCell>
            <TableCell>{row.reach}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  </Container>
);

const Container = styled.div`
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 
              0px 1px 1px 0px rgba(0,0,0,0.14), 
              0px 1px 3px 0px rgba(0,0,0,0.12);
  max-width: 65rem;
  margin: auto;
  overflow: hidden;
`;

const Table = styled.table`
  border: none;
  display: table;
  width: 100%;
`;

const TableHead = styled.thead`
  border: none;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

const TableHeader = styled.th`
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`;

const TableCell = styled.td`
  border: none;
`;

export default ShortTable;