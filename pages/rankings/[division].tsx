import { NextPage, GetServerSideProps } from "next";
import styled from "styled-components";
import { getDivisionsData } from "../../api/divisions";
import divisionApiTitles from "../../data/divisionApiTitles";

type DivisionProps = {
  title: string;
  data: any;
};

const Division: NextPage<DivisionProps> = ({ title, data }) => (
  <div>
    <DivisionTitle>{title}</DivisionTitle>
    <ul>
      {data.map((fighter: any, index: number) => (
        <li key={index}>{fighter.name}</li>
      ))}
    </ul>
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let { division } = query;
  let title, data, apiTitle;

  if (division && typeof division === "string") {
    title = division.replace(/-/g, " ");
    apiTitle = divisionApiTitles[division];
    data = await getDivisionsData(apiTitle);
  }

  return { props: { title, data } };
};

const DivisionTitle = styled.h1`
  color: ${(props) => props.theme.textDark};
  text-align: center;
  text-transform: capitalize;
`;

export default Division;
