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

const Home: NextPage<HomeProps> = ({ events, matches, fighters }) => {

  return (
    <div>
      <h1>2020 Fight Census</h1>
      <p>{events.length} events</p>
      <p>{matches.length} matches</p>
      <p>{fighters.length} fighters</p>
      <LinkContainer>
        <Link href="/size">
          <a>Start here</a>
        </Link>
      </LinkContainer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const events = await useCache("events", getAllEvents);
  const matches = await useCache("matches", getAllMatches);
  const fighters = await useCache("fighters", getAllFighters);

  return { props: { events, matches, fighters } };
};

const LinkContainer = styled.div`
  margin-top: 5rem;
  text-align: center;

  a {
    font-size: 2rem;
  }
`;

export default Home;