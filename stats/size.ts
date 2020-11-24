import useCache from '../database/useCache';
import { combineMatchAndFighterData } from '../database/utils';

const sizeStats = async () => {
  const combined = await useCache("combined", combineMatchAndFighterData);
  const stats = [];

  const biggerFighterWinRate = (matches: any) => {
    let counter = 0;
    
    matches.forEach((match: any) => {
      const winner = match.red;
      const loser = match.blue;
  
      if (winner.height > loser.height && winner.reach > loser.reach) {
        counter++;
      }
    });
  
    return {
      title: "Win rate of bigger fighters",
      stat: counter / matches.length
    };
  };

  stats.push(biggerFighterWinRate(combined));
  
  return stats;
};

export default sizeStats;

