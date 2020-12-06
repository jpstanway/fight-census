import { longStackTraces } from 'bluebird';
import useCache from '../database/useCache';
import { combineMatchAndFighterData } from '../database/utils';
import { convertHeight, convertReach } from './utils/size.utils';

const sizeStats = async () => {
  const combined = await useCache("combined", combineMatchAndFighterData);
  const stats = [];

  const biggerFighterWinRate = (matches: any) => {
    let bigger = 0;
    let smaller = 0;
    let equal = 0;
    let tested = 0;
    
    matches.forEach((match: any) => {
      const winner = match.red;
      const loser = match.blue;

      // only run calculation if both fighters
      // have these stats available
      if (winner.height && loser.height && winner.reach && loser.reach) {
        winner.height = convertHeight(winner.height);
        winner.reach = convertReach(winner.reach);
        
        loser.height = convertHeight(loser.height);
        loser.reach = convertReach(loser.reach);
      
        // increase if winner is all around larger
        if (winner.height > loser.height && winner.reach > loser.reach) {
          bigger++;
          tested++;
        }

        // increase if same reach but winner is taller
        if (winner.height > loser.height && winner.reach === loser.reach) {
          bigger++;
          tested++;
        }

        // increase if same height but winner is longer
        if (winner.height === loser.height && winner.reach > loser.reach) {
          bigger++;
          tested++;
        }

        // increase if winner is all around smaller
        if (winner.height < loser.height && winner.reach < loser.reach) {
          smaller++;
          tested++;
        }

        // increase if same reach but winner is shorter
        if (winner.height < loser.height && winner.reach === loser.reach) {
          smaller++;
          tested++;
        }

        // increase if same height but winner is not as long
        if (winner.height === loser.height && winner.reach < loser.reach) {
          smaller++;
          tested++;
        }

        // increase if both winner and loser are exact same size
        if (winner.height === loser.height && winner.reach === loser.height) {
          equal++;
          tested++;
        }
      }
    });
    console.log('bigger', bigger, 'smaller', smaller, 'equal', equal, 'sample size', tested);
    return {
      title: "Size of winner compared to loser",
      stats: [
        Math.ceil((bigger / tested) * 100),
        Math.ceil((smaller / tested) * 100),
        Math.ceil((equal / tested) * 100)
      ]
    };
  };

  stats.push(biggerFighterWinRate(combined));
  
  return stats;
};

export default sizeStats;

