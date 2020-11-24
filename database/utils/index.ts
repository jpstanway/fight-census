import useCache from '../useCache';
import { getAllMatches } from '../api/matches';
import { getAllFighters } from '../api/fighters';
import { Match, Fighter } from '../../types';

export const combineMatchAndFighterData = async () => {
  const matches = await useCache("matches", getAllMatches);
  const fighters = await useCache("fighters", getAllFighters);

  // combine fighter stats with match data
  const matchesMap = matches.map((match: Match) => {
    const winner = fighters.find((fighter: Fighter) => match.red.name === fighter.name);
    const loser = fighters.find((fighter: Fighter) => match.blue.name === fighter.name);

    if (winner) match.red = winner;
    if (loser) match.blue = loser;

    return match;
  });

  return matchesMap;
};