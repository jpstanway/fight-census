import { NextPage, GetServerSideProps } from 'next';
import styled from "styled-components";

import useCache from '../../api/useCache';
import { getPastEvents, getMatches, getFighterPhysicalStats } from '../../api/stats/stats';
import { Event, Match } from '../../types/types';

const Stats: NextPage = () => {

  return (
    <div>
      <h1>All Stats</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const events = await useCache('pastEvents', getPastEvents);
  
  const matchesData = await events.map(async (event: Event) => {
    const matches = await useCache(event.title, getMatches, event.link);
    
    return await matches.map(async (match: Match) => {
      if (match.redLink) {
        match.redStats = await useCache(match.red, getFighterPhysicalStats, match.redLink);
      }
      if (match.blueLink) {
        match.blueStats = await useCache(match.blue, getFighterPhysicalStats, match.blueLink);
      }
      
      return match;
    });
  });

  return { props: {}};
};

export default Stats;
