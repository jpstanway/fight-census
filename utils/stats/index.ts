import { Match, Fighter } from '../../types';

export const combineMatchAndFighterData = (matches: Match[], fighters: Fighter[]) => {
  // combine fighter stats with match data
  const matchesMap = matches.map((match) => {
    const winner = fighters.find((fighter) => match.red.name === fighter.name);
    const loser = fighters.find((fighter) => match.blue.name === fighter.name);

    if (winner) match.red = winner;
    if (loser) match.blue = loser;

    return match;
  });

  return matchesMap;
};