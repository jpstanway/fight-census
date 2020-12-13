import { NextPage } from 'next';
import styled from 'styled-components';

type TableProps = {
  headers: string[];
  rows: any;
}

const ShortTable: NextPage<TableProps> = ({ headers, rows }) => (
  <Container>
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          {headers.map((header, i) => (
            <TableHeader key={i}>{header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
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
      </TableBody>
    </Table>
  </Container>
);

const Container = styled.div`

`;

const Table = styled.table`

`;

const TableHead = styled.thead`

`;

const TableRow = styled.tr`

`;

const TableHeader = styled.th`

`;

const TableBody = styled.tbody`

`;

const TableCell = styled.td`

`;

export default ShortTable;