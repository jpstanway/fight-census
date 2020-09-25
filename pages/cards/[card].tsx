import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { Fight, Cards } from "../../types/types";
import { wrapper } from "../../redux/store";

import useCache from "../../api/useCache";
import { getFights } from "../../redux/fights/helpers";
import { getCards } from "../../redux/cards/helpers";
import { initializeFights } from "../../redux/fights/actions";
import { initializeCards } from "../../redux/cards/actions";
import FightsTable from "../../components/Common/Tables/FightsTable";

type CardProps = {
  cards: Cards;
  fights: Fight[];
  cardTitle: string;
};

const Card: NextPage<CardProps> = ({ fights, cards, cardTitle }) => {
  const title = cardTitle.replace(/_/g, " ");

  return (
    <div>
      <Link href="/cards">
        <NavigationButton>
          <img src="/navigate-before.svg" alt="back arrow" />
          All Cards
        </NavigationButton>
      </Link>
      <CardTitle>{title}</CardTitle>
      <FightsTable rows={fights} />
      <CardNavigation>
        <Link href="/cards">
          <NavigationButton>
            <img src="/arrow-left.svg" alt="previous arrow" />
            Previous card
          </NavigationButton>
        </Link>
        <Link href="/cards">
          <NavigationButton>
            Next card
            <img src="/arrow-right.svg" alt="next arrow" />
          </NavigationButton>
        </Link>
      </CardNavigation>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    // get card information from api
    let { card } = query;

    if (card && typeof card === "string") {
      const fights: Fight[] = await useCache(card, getFights, true);
      await store.dispatch<any>(initializeFights(fights));

      const cards: Cards = await useCache("cards", getCards);
      await store.dispatch<any>(initializeCards(cards));

      return { props: { fights, cards, cardTitle: card } };
    }
  }
);

const NavigationButton = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h1`
  text-align: center;
`;

const CardNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export default Card;
