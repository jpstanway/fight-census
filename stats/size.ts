import { longStackTraces } from 'bluebird';
import useCache from '../database/useCache';
import { combineMatchAndFighterData } from '../database/utils';
import { convertHeight, convertReach } from './utils/size.utils';

const sizeStats = async () => {
  const combined = await useCache("combined", combineMatchAndFighterData);
  const stats = [];

  const biggerFighterWinRate = (matches: any) => {
    let counter = 0;
    let tested = 0;
    
    matches.forEach((match: any) => {
      const winner = match.red;
      const loser = match.blue;

      // only run calculation if both fighters
      // have these stats available
      if (winner.height && loser.height && winner.reach && loser.reach) {
        tested++;
        winner.height = convertHeight(winner.height);
        winner.reach = convertReach(winner.reach);
        
        loser.height = convertHeight(loser.height);
        loser.reach = convertReach(loser.reach);
      
        // increase if winner is all around larger
        if (winner.height > loser.height && winner.reach > loser.reach) {
          counter++;
        }

        // increase if same reach but winner has more height
        if (winner.height > loser.height && winner.reach === loser.reach) {
          counter++;
        }

        // increase if same height but winner has more reach
        if (winner.height === loser.height && winner.reach > loser.reach) {
          counter++;
        }
      }
    });
    
    return {
      title: "Win rate of bigger fighters",
      stat: counter / tested
    };
  };

  stats.push(biggerFighterWinRate(combined));
  
  return stats;
};

export default sizeStats;

