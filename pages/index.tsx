import { NextPage, GetServerSideProps } from "next";
import Link from 'next/link';
import styled from 'styled-components';

import dbConnect from '../database/db';
// import useCache from '../database/useCache';
// import { getAllEvents } from '../database/api/events';
// import { getAllMatches } from '../database/api/matches'; 
// import { getAllFighters } from '../database/api/fighters';
// import { Event, Match, Fighter } from '../types';

type HomeProps = {
  events: any[];
  matches: any[];
  fighters: any[];
}

type SingleStatProps = { readonly color: string };

const Home: NextPage<HomeProps> = ({ events, matches, fighters }) => (
  <Container>
    <InnerContainer>
      <Title>UFC Fighter Stats</Title>
      <Items>
        <li>
          <SingleStat color="blue">
            {events.length} 
            <span>events</span>
          </SingleStat>
        </li>
        <li>
          <SingleStat color="green">
            {matches.length} 
            <span>matches</span>
          </SingleStat>
        </li>
        <li>
          <SingleStat color="red">
            {fighters.length}
            <span>fighters</span>
          </SingleStat>
        </li>
      </Items>
      <LinkContainer>
        <Link href="/size">
          <a>Start here</a>
        </Link>
      </LinkContainer>
    </InnerContainer>
  </Container>
);

export const getServerSideProps: GetServerSideProps = async () => {
  //await dbConnect();

  try {
    const events = [1];
    const matches = [1, 2];
    const fighters = [1, 2, 3];
    // const events = await useCache("events", getAllEvents);
    // const matches = await useCache("matches", getAllMatches);
    // const fighters = await useCache("fighters", getAllFighters);
    return { props: { events, matches, fighters } };
  } catch (error) {
    throw new Error(error.message);
  }
};

const Container = styled.div`
  position: relative;
  min-height: 100%;
  min-width: 100%;
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.textLight};
  font-style: italic;
  text-align: center;
`;

const Items = styled.ul`
  display: flex;
  justify-content: space-around;
`;

const SingleStat = styled.p<SingleStatProps>`
  color: ${(props) => props.theme.colors[props.color]};
  display: flex;
  flex-direction: column;
  font-size: 10rem;
  font-weight: 700;
  margin: 0;
  text-align: center;

  span {
    font-size: 1.6rem;
  }
`;

const LinkContainer = styled.div`
  margin-top: 5rem;
  text-align: center;

  a {
    font-size: 2rem;
  }
`;

export default Home;