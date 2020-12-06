import { longStackTraces } from 'bluebird';
import useCache from '../database/useCache';
import { combineMatchAndFighterData } from '../database/utils';
import { convertHeight, convertReach } from './utils/size.utils';

const sizeStats = async () => {
  const combined = await useCache("combined", combineMatchAndFighterData);
  const stats = [];

  // comparing size of winner compared to opponent
  const winnerSizeComparison = (matches: any) => {
    let bigger = 0;
    let smaller = 0;
    let equal = 0;
    let checking = 0;
    let tested = 0;
    
    matches.forEach((match: any) => {
      const winner = match.red;
      const loser = match.blue;

      // only run calculation if both fighters
      // have these stats available
      if (winner.height && loser.height && winner.reach && loser.reach) {
        checking++;
        winner.height = convertHeight(winner.height);
        winner.reach = convertReach(winner.reach);
        
        loser.height = convertHeight(loser.height);
        loser.reach = convertReach(loser.reach);
        
        // CASE 1: WINNER IS BIGGER
        // increase if winner is all around larger
        if (winner.height > loser.height && winner.reach > loser.reach) {
          bigger++;
          tested++;
          return;
        }

        // increase if same reach but winner is taller
        if (winner.height > loser.height && winner.reach === loser.reach) {
          bigger++;
          tested++;
          return;
        }

        // increase if same height but winner is longer
        if (winner.height === loser.height && winner.reach > loser.reach) {
          bigger++;
          tested++;
          return;
        }

        // increase if total reach and height is more than loser
        if ((winner.height + winner.reach) > (loser.height + loser.reach)) {
          bigger++;
          tested++;
          return;
        }

        // CASE 2: WINNER IS SMALLER
        // increase if winner is all around smaller
        if (winner.height < loser.height && winner.reach < loser.reach) {
          smaller++;
          tested++;
          return;
        }

        // increase if same reach but winner is shorter
        if (winner.height < loser.height && winner.reach === loser.reach) {
          smaller++;
          tested++;
          return;
        }

        // increase if same height but winner is not as long
        if (winner.height === loser.height && winner.reach < loser.reach) {
          smaller++;
          tested++;
          return;
        }

        // increase if total reach and height is less than loser
        if ((winner.height + winner.reach) < (loser.height + loser.reach)) {
          smaller++;
          tested++;
          return;
        }

        // CASE 3: WINNER IS EXACT SAME SIZE
        // increase if both winner and loser are exact same size
        if (winner.height === loser.height && winner.reach === loser.height) {
          equal++;
          tested++;
          return;
        }

        // increase if total reach and height are the same
        if ((winner.height + winner.reach) === (loser.height + loser.reach)) {
          equal++;
          tested++;
          return;
        }

        console.log(winner.height, loser.height, winner.reach, loser.reach);
      }
    });
    console.log('bigger', bigger, 'smaller', smaller, 'equal', equal, 'sample size', tested, 'checking', checking);
    return {
      title: "Size of winner compared to loser (%)",
      stats: [
        Math.ceil((bigger / tested) * 100),
        Math.ceil((smaller / tested) * 100),
        Math.ceil((equal / tested) * 100)
      ]
    };
  };

  stats.push(winnerSizeComparison(combined));

  // gets list of the largest fighters in each division
  const biggestFightersByDivision = () => {

  };

  // number of champions who are big for their weight class
  const championsAboveAverageSize = () => {

  };

  // weight switching fighters win rate
  const divisionSwapWinRate = () => {

  };
  
  return stats;
};

export default sizeStats;

