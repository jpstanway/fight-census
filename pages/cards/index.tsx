import { NextPage } from "next";
import { useSelector } from "react-redux";
import { Card as CardType } from "../../types/types";
import { RootState } from "../../redux/store";

import CardsTable from "../../components/Common/Tables/CardsTable";

type CardProps = {
  cards: {
    upcoming: CardType[];
    past: CardType[];
  };
};

const Cards: NextPage<CardProps> = () => {
  const cards = useSelector((state: RootState) => state.cards);

  return (
    <div>
      <h1>Upcoming Cards</h1>
      <CardsTable rows={cards.upcoming} />
      <h1>Past Cards</h1>
      <CardsTable rows={cards.past} />
    </div>
  );
};

export default Cards;
