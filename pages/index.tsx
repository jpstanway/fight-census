import { NextPage, GetServerSideProps } from "next";
import Link from 'next/link';
import styled from 'styled-components';

import dbConnect from '../database/db';
import useCache from '../database/useCache';
import { getAllEvents } from '../database/api/events';
import { getAllMatches } from '../database/api/matches'; 
import { getAllFighters } from '../database/api/fighters';
import { Event, Match, Fighter } from '../types';

type HomeProps = {
  events: Event[];
  matches: Match[];
  fighters: Fighter[];
}

type SingleStatProps = { readonly color: string };

const Home: NextPage<HomeProps> = ({ events, matches, fighters }) => (
  <Container>
    <InnerContainer>
      <Title>UFC Fighter Stats</Title>
      <Items>
        <Item>
          <SingleStat color="blue">
            {events.length} 
            <span>events</span>
          </SingleStat>
        </Item>
        <Item>
          <SingleStat color="green">
            {matches.length} 
            <span>matches</span>
          </SingleStat>
        </Item>
        <Item>
          <SingleStat color="red">
            {fighters.length}
            <span>fighters</span>
          </SingleStat>
        </Item>
      </Items>
      <LinkContainer>
        <Link href="/size">
          <a>Start here</a>
        </Link>
      </LinkContainer>
      <Summary>
        <SummaryItem>
          This site compiles information about the UFC fighter base into a census. The stats provided are to help identify current trends, as well as to help inform betting decisions.
        </SummaryItem>
        <SummaryItem>
          Please keep in mind that the data only covers the current UFC roster, and for the previous year (or season). Enjoy!
        </SummaryItem>
      </Summary>
    </InnerContainer>
  </Container>
);

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  try {
    const events = await useCache("events", getAllEvents);
    const matches = await useCache("matches", getAllMatches);
    const fighters = await useCache("fighters", getAllFighters);
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
  width: 100%;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.textLight};
  font-style: italic;
  text-align: center;
`;

const Items = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Item = styled.li`
  min-width: 17rem;
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

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    font-size: 8rem;
  }
`;

const LinkContainer = styled.div`
  margin: 5rem 0;
  text-align: center;

  a {
    font-size: 2rem;
  }
`;

const Summary = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 
              0px 1px 1px 0px rgba(0,0,0,0.14), 
              0px 1px 3px 0px rgba(0,0,0,0.12);
  margin: auto;
  max-width: 50rem;
  padding: 1rem 2rem;
`;

const SummaryItem = styled.p`
  font-style: italic;
`;

export default Home;