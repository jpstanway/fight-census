import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { Fight, Cards } from "../../types/types";

import useCache from "../../api/useCache";
import { getFights } from "../../api/fights";
import { getCards } from "../../api/cards";
import FightsTable from "../../components/Common/Tables/FightsTable";

type CardProps = {
  cards: Cards;
  fights: Fight[];
  cardTitle: string;
};

const Card: NextPage<CardProps> = ({ fights, cardTitle }) => {
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // get card information from api
  let { card } = query;
  let fights: Fight[] = [];
  let cards: Cards = { upcoming: [], past: [] };

  if (card && typeof card === "string") {
    fights = await useCache(card, getFights, true);
    cards = await useCache("cards", getCards);
  }

  return { props: { fights, cards, cardTitle: card } };
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
