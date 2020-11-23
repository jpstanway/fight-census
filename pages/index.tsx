import { NextPage, GetServerSideProps } from "next";

import dbConnect from '../database/db';
import { getAllEvents } from '../api/events';
import { getAllMatches } from '../api/matches'; 
import { getAllFighters } from '../api/fighters';
import { Event, Match, Fighter } from '../types';

type HomeProps = {
  events: Event[];
  matches: Match[];
  fighters: Fighter[];
}

const Home: NextPage<HomeProps> = ({ events, matches, fighters }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>{events.length} events</p>
      <p>{matches.length} matches</p>
      <p>{fighters.length} fighters</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const events = await getAllEvents();
  const matches = await getAllMatches();
  const fighters = await getAllFighters();

  return { props: { events, matches, fighters } };
};

export default Home;
