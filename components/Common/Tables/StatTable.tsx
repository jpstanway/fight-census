import { NextPage } from 'next';
import styled from 'styled-components';

type TableProps = {
  headers: string[];
  children: any;
}

const ShortTable: NextPage<TableProps> = ({ headers, children }) => (
  <Container>
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header, i) => (
            <TableHeader key={i}>{header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      {children}
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

export default ShortTable;