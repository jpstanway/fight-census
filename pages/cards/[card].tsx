import { GetServerSideProps } from "next";
import { Fight } from "../../types/types";
import styled from "styled-components";

import FightsTable from "../../components/Common/Tables/FightsTable";
import getEvent from "../../utils/cards/getEvent";

type EventProps = {
  data: Fight[];
};

const Card: React.FC<EventProps> = ({ data }) => (
  <div>
    <SectionTitle>Card</SectionTitle>
    <FightsTable rows={data} />
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { card } = query;
  const data = await getEvent(card);

  return { props: { data } };
};

const SectionTitle = styled.h1`
  text-transform: capitalize;
`;

export default Card;
