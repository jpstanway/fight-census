import { GetServerSideProps } from "next";
import { connect } from "react-redux";
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

const Cards: React.FC<CardProps> = ({ cards }) => (
  <div>
    <h1>Upcoming Cards</h1>
    <CardsTable rows={cards.upcoming} />
    <h1>Past Cards</h1>
    <CardsTable rows={cards.past} />
  </div>
);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const upcoming = await createCardsTable("7");
    const past = await createCardsTable("8");
    const data = { upcoming, past };

    store.dispatch(initializeCards(data));
  }
);

const mapStateToProps = (state: any) => ({
  cards: state.cards,
});

export default connect(mapStateToProps, {})(Cards);
