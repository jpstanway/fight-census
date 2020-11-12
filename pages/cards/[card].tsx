import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { Fight, Cards } from "../../types/types";

import useCache from "../../api/useCache";
import { getFights } from "../../api/cards/fights";
import { getCards, getAdjacentCards } from "../../api/cards/cards";
import FightsTable from "../../components/Tables/FightsTable";

type CardProps = {
  fights: Fight[];
  title: string;
  adjacentCards: { prev?: string; next?: string };
};

const Card: NextPage<CardProps> = ({ fights, title, adjacentCards }) => (
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
      {adjacentCards.prev ? (
        <Link href={adjacentCards.prev}>
          <NavigationButton>
            <img src="/arrow-left.svg" alt="previous arrow" />
            Previous card
          </NavigationButton>
        </Link>
      ) : null}
      {adjacentCards.next ? (
        <Link href={adjacentCards.next}>
          <NavigationButton>
            Next card
            <img src="/arrow-right.svg" alt="next arrow" />
          </NavigationButton>
        </Link>
      ) : null}
    </CardNavigation>
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // get card information from api
  let { card } = query;
  let title, adjacentCards;
  let fights: Fight[] = [];
  let cards: Cards = { upcoming: [], past: [] };

  if (card && typeof card === "string") {
    title = card.replace(/_/g, " ");
    fights = await useCache(card, getFights, true);
    cards = await useCache("cards", getCards);

    adjacentCards = getAdjacentCards(cards, title);
  }

  return { props: { fights, title, adjacentCards } };
};

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
