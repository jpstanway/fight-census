import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import styled from "styled-components";

import useCache from "../../api/useCache";
import { getDivisionsData } from "../../api/divisions";
import formatDivisionString from '../../utils/rankings/formatDivisionString';

type DivisionProps = {
  title: string;
  data: any;
};

const Division: NextPage<DivisionProps> = ({ title, data }) => (
  <div>
    <DivisionTitle>{title}</DivisionTitle>
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
          | {fighter.age}| {fighter.height}| {fighter.record} | {fighter.rank}
        </li>
      ))}
    </ul>
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let { division } = query;
  let title, data;

  if (division && typeof division === "string") {
    title = formatDivisionString(division);
    data = await useCache(title, getDivisionsData, true);
  }

  return { props: { title, data } };
};

const DivisionTitle = styled.h1`
  color: ${(props) => props.theme.textDark};
  text-align: center;
  text-transform: capitalize;
`;

export default Division;
