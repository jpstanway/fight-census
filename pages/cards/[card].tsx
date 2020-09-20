import { NextPage, GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import Link from "next/link";
import styled from "styled-components";
import { Fight as FightType } from "../../types/types";
import { wrapper, RootState } from "../../redux/store";

import { initializeFights } from "../../redux/fights/actions";
import FightsTable from "../../components/Common/Tables/FightsTable";

type CardProps = {
  fights: FightType[];
  cardTitle: string;
};

const Card: NextPage<CardProps> = ({ fights, cardTitle }) => {
  const cards = useSelector((state: RootState) => state.cards);
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

    if (card) {
      await store.dispatch<any>(initializeFights(card.toString()));

      const { fights } = store.getState();

      return { props: { fights, cardTitle: card } };
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
