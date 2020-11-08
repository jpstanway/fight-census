import { NextPage, GetServerSideProps } from 'next';
import styled from "styled-components";

import useCache from '../../api/useCache';
import { getPastEvents } from '../../api/stats/stats';

const Stats: NextPage = () => {

  return (
    <div>
      <h1>All Stats</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const events = await useCache('pastEvents', getPastEvents);
  console.log(events);
  return { props: {}};
};

export default Stats;
