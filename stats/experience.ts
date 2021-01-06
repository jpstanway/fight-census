import useCache from '../database/useCache';
import { getAllFighters } from '../database/api/fighters';
import { getAllMatches } from '../database/api/matches';
import { Fighter, Match, IterableObject } from '../types';

const experienceStats = async () => {
  const fighters = await useCache('fighters', getAllFighters);
  const matches = await useCache('matches', getAllMatches);
  const stats: any = [];

  const debutFighterWinRate = () => {
    let wins = 0, losses = 0;

    fighters.forEach((fighter: Fighter) => {
      const debutResult = fighter.debut;

      if (debutResult) {
        if (debutResult.toLowerCase() === "win") {
          wins++;
        }
        if (debutResult.toLowerCase() === "loss") {
          losses++;
        }
      }
    });

    const rate = Math.ceil((wins / (wins + losses)) * 100) + '%';

    return {
      type: "single",
      color: "green",
      title: "Debut fighter result",
      labels: ["Win rate of debut fighters"],
      stats: [rate]
    };
  };
  stats.push(debutFighterWinRate());

  const perfectSeason = () => {
    type Stat = { name: string; count: number };
    type Count = { 
      [key: string]: {
        name: string; 
        count: number 
      }
    };
    const perfect: Count = {};
    const hasLost: string[] = [];
    const stats: Stat[] = [];

    matches.forEach((match: Match) => {
      const winner = match.red.name;
      const loser = match.blue.name;
      const result = match.result;

      // remove from perfect if fighter has lost
      if (perfect[loser]) {
        delete perfect[loser];
        hasLost.push(loser);
      }

      // increase count in the perfect object
      if (perfect[winner] && !result.toLowerCase().includes('draw')) {
        perfect[winner].count++;
      }

      // add to perfect winner if no losses
      if (!perfect[winner] && !hasLost.includes(winner)) {
        perfect[winner] = { name: winner, count: 1 };
      }
    });
    Object.keys(perfect).forEach((key) => stats.push(perfect[key]));
    const filtered = stats.filter((item) => item.count >= 3);
    filtered.sort((a, b) => b.count - a.count);

    return {
      type: "table",
      title: "Perfect season (3+ undefeated streak this year)",
      labels: ["Fighter", "Streak"],
      stats: filtered,
      component: 'PerfectSeasonTable'
    };
  };
  stats.push(perfectSeason());

  return { stats, next: '/' };
};

export default experienceStats;