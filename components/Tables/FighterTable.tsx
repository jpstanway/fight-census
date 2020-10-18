import Link from 'next/link';
import styled from 'styled-components';

type TableProps = {
  rows: any;
};

const FighterTable: React.FC<TableProps> = ({ rows }) => (
  <Table>
    <thead>
      <tr>
        {rows[0].rank ? <th>Rank</th> : null}
        <th>Name</th>
        <th>Country</th>
        <th>Age</th>
        <th>Height</th>
        <th>Record</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row: any, i: number) => (
        <tr key={i}>
          {row.rank ? <td>{row.rank === "0" ? "(C)" : row.rank}</td> : null}
          <td>
            {row.link ? (
              <Link href={row.link}>
                <a>{row.name}</a>
              </Link>
            ) : (
              row.name
            )}
          </td>
          <td>{row.country ? row.country.replace(/Flag of\s|the\s|.svg/gi, "") : null}</td>
          <td>{row.age ? row.age : null}</td>
          <td>{row.height ? row.height : null}</td>
          <td>{row.record ? row.record: null}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const Table = styled.table`
  margin-bottom: 2rem;
`;

export default FighterTable;