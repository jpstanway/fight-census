import { NextPage, GetServerSideProps } from "next";
import { wrapper } from "../../redux/store";
import { Card as CardType } from "../../types/types";

import { initializeCards } from "../../redux/cards/actions";

import CardsTable from "../../components/Common/Tables/CardsTable";
import createCardsTable from "../../utils/cards/createCardsTable";

type CardProps = {
  cards: {
    upcoming: CardType[];
    past: CardType[];
  };
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
    const year = new Date().getFullYear();
    const page = `${year.toString()}_in_UFC`;
    const upcoming = await createCardsTable(page, "Scheduled events");
    const past = await createCardsTable(page, "Past events");
    const cards = { upcoming, past };

    store.dispatch(initializeCards(cards));

    return { props: { cards } };
  }
);

export default Cards;
