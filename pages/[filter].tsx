import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";

import useCache from '../database/useCache';
import { getAllMatches } from '../database/api/matches';
import { getAllFighters } from '../database/api/fighters';
import { combineMatchAndFighterData } from '../utils/stats';

const Filter: NextPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Stats by {query.filter}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const matches = await useCache("matches", getAllMatches);
  const fighters = await useCache("fighters", getAllFighters);
  const combined = combineMatchAndFighterData(matches, fighters);

  return { props: {} }
};

export default Filter;
