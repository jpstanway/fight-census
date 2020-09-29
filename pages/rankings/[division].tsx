import { NextPage, GetServerSideProps } from "next";
import styled from "styled-components";

type DivisionProps = {
  title: string;
};

const Division: NextPage<DivisionProps> = ({ title }) => (
  <div>
    <DivisionTitle>{title}</DivisionTitle>
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let { division } = query;
  let title;

  if (division && typeof division === "string") {
    title = division.replace(/-/g, " ");
  }

  return { props: { title } };
};

const DivisionTitle = styled.h1`
  color: ${(props) => props.theme.textDark};
  text-align: center;
  text-transform: capitalize;
`;

export default Division;
