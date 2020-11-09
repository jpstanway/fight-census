import { NextPage, GetServerSideProps } from 'next';
import styled from "styled-components";

import useCache from '../../api/useCache';
import { getPastEvents, getMatches } from '../../api/stats/stats';
import { Event } from '../../types/types';

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
    return await useCache(event.title, getMatches, event.link);
  });
  return { props: {}};
};

export default Stats;
