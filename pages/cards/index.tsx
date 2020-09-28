import { NextPage, GetStaticProps } from "next";
import { Cards as CardsType } from "../../types/types";

import useCache from "../../api/useCache";
import { getCards } from "../../api/cards";
import CardsTable from "../../components/Common/Tables/CardsTable";

type CardProps = {
  cards: CardsType;
};

const Cards: NextPage<CardProps> = ({ cards }) => (
  <div>
    <h1>Upcoming Cards</h1>
    <CardsTable rows={cards.upcoming} />
    <h1>Past Cards</h1>
    <CardsTable rows={cards.past} />
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const cards: CardsType = await useCache("cards", getCards);

  return { props: { cards } };
};

export default Cards;
