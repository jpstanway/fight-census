import { NextPage, GetServerSideProps } from "next";
import { wrapper } from "../../redux/store";
import { Cards as CardsType } from "../../types/types";

import useCache from "../../api/useCache";
import { getCards } from "../../redux/cards/helpers";
import { initializeCards } from "../../redux/cards/actions";
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const cards: CardsType = await useCache("cards", getCards);
    await store.dispatch<any>(initializeCards(cards));

    return { props: { cards } };
  }
);

export default Cards;
