import { NextPage, GetServerSideProps } from "next";
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
      <h1>Home Page</h1>
      <p>{events.length} events</p>
      <p>{matches.length} matches</p>
      <p>{fighters.length} fighters</p>
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

export default Home;