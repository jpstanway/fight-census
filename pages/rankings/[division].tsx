import { useState } from 'react';
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

type ToggleProps = {
  readonly toggle: boolean;
};

const Division: NextPage<DivisionProps> = ({ title, top15, data }) => {
  const [toggle, setToggle] = useState(false);
  const ranked: string[] = [];

  return (
    <div>
      <DivisionTitle>{title}</DivisionTitle>
      <ul>
        {top15.map((fighter: any, index: number) => {
        ranked.push(fighter.link);  
        return (
          <li key={index}>
            {fighter.rank === "0" ? "(C)" : fighter.rank}.{" "} 
            {fighter.link ? (
              <Link href={fighter.link}>
                <a>{fighter.name}</a>
              </Link>
            ) : (
              fighter.name
            )}
          </li>
        )})}
      </ul>
      <Button onClick={() => setToggle(!toggle)}>{toggle ? "Show Less of Division" : "Show More of Division"}</Button>
      <ExpandableList toggle={toggle}>
      {data.map((fighter: any, index: number) => {
        if (!ranked.includes(fighter.link)) {
          return (
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
          );
        }
      })}
      </ExpandableList>
    </div>
  );
};

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

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.lightBlue};
  border: 1px solid ${(props) => props.theme.colors.lightBlue};
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 1rem 5rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.darkBlue};
    border-color: ${(props) => props.theme.colors.darkBlue};
  }

  &:active,
  &:focus {
    outline: none;
  }
`;

const ExpandableList = styled.ul<ToggleProps>`
  transition: all 0.2s;
  opacity: ${(props) => props.toggle ? "1" : "0"};
  visibility: ${(props) => props.toggle ? "visible" : "hidden"};
`;

export default Division;
