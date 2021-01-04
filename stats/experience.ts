import useCache from '../database/useCache';
import { getAllFighters } from '../database/api/fighters';
import { Fighter } from '../types';

const experienceStats = async () => {
  const fighters = await useCache('fighters', getAllFighters);
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

  return { stats, next: '/' };
};

export default experienceStats;