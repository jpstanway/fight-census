import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import styled from "styled-components";

import useCache from "../../api/useCache";
import { getTop15, getDivisionData } from "../../api/divisions";
import formatDivisionString from '../../utils/rankings/formatDivisionString';

type DivisionProps = {
  title: string;
  top15: any;
  data: any;
};

const Division: NextPage<DivisionProps> = ({ title, top15, data }) => (
  <div>
    <DivisionTitle>{title}</DivisionTitle>
    <ul>
      {top15.map((fighter: any, index: number) => (
        <li key={index}>
          {fighter.rank}.{" "} 
          {fighter.link ? (
            <Link href={fighter.link}>
              <a>{fighter.name}</a>
            </Link>
          ) : (
            fighter.name
          )}
        </li>
      ))}
    </ul>
    <ul>
    {data.map((fighter: any, index: number) => (
        <li key={index}>
          {fighter.link ? (
            <Link href={fighter.link}>
              <a>{fighter.name}</a>
            </Link>
          ) : (
            fighter.name
          )}
          | {fighter.age} | {fighter.height} | {fighter.record}
        </li>
      ))}
    </ul>
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let { division } = query;
  let title, data, top15;

  if (division && typeof division === "string") {
    title = formatDivisionString(division);
    top15 = await useCache(`${title}--top-15`, getTop15, title);
    data = await useCache(title, getDivisionData, title);
  }

  return { props: { title, top15, data } };
};

const DivisionTitle = styled.h1`
  color: ${(props) => props.theme.textDark};
  text-align: center;
  text-transform: capitalize;
`;

export default Division;
