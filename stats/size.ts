import useCache from '../database/useCache';
import { combineMatchAndFighterData } from '../database/utils';
import { getAllFighters } from '../database/api/fighters';
import { convertHeight, convertReach, compareSize } from './utils/size.utils';
import { Match, Fighter } from '../types';

const sizeStats = async () => {
  const combined = await useCache("combined", combineMatchAndFighterData);
  const fighters = await useCache("fighters", getAllFighters);
  const stats = [];

  // comparing size of winner compared to opponent
  const winnerSizeComparison = (matches: Match[]) => {
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
      }
    });
    console.log('bigger', bigger, 'smaller', smaller, 'equal', equal, 'sample size', tested, 'checking', checking);
    return {
      type: "doughnut",
      title: "Size of winner compared to loser (%)",
      labels: ["Bigger", "Smaller", "Equal"],
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
    type FighterSpecial = { [key: string]: Fighter };
    let biggest: FighterSpecial = {};
    const stats: Fighter[] = [];
    const regex = /\d\d\d\slb/i;

    fighters.forEach((fighter: Fighter) => {
      const match = fighter.weight?.match(regex);
      let weight = 0;
      if (match) weight = parseInt(match[0].substring(0, 3));

      // if either of these are false, skip this fighter
      if (!fighter.height || !fighter.reach) return;

      // heavyweight
      if (weight > 209) {
        biggest = compareSize("heavyweight", biggest, fighter);
        return;
      }
      // light heavyweight
      if (weight > 200 && weight < 209) {
        biggest = compareSize("lightHeavyweight", biggest, fighter);
        return;
      }
      // middleweight
      if (weight > 180 && weight < 189) {
        biggest = compareSize("middleweight", biggest, fighter);
        return;
      }
      // welterweight
      if (weight > 165 && weight < 174) {
        biggest = compareSize("welterweight", biggest, fighter);
        return;
      }
      // lightweight
      if (weight > 150 && weight < 159) {
        biggest = compareSize("lightweight", biggest, fighter);
        return;
      }
      // featherweight
      if (weight > 140 && 149) {
        biggest = compareSize("featherweight", biggest, fighter);
        return;
      }
      // bantamweight
      if (weight > 130 && 139) {
        biggest = compareSize("bantamweight", biggest, fighter);
        return;
      }
      // flyweight
      if (weight > 120 && 129) {
        biggest = compareSize("flyweight", biggest, fighter);
        return;
      }
      // womens featherweight

      // womens bantamweight

      // womens flyweight

      // womens strawweight
    });

    // create an array out of the object
    Object.keys(biggest).forEach((div) => stats.push(biggest[div]));
    
    return {
      type: "table",
      title: "Biggest fighters by division",
      labels: ["Division", "Name", "Height", "Reach"],
      stats
    };
  };

  stats.push(biggestFightersByDivision());

  // number of champions who are big for their weight class
  const championsAboveAverageSize = () => {

  };

  // weight switching fighters win rate
  const divisionSwapWinRate = () => {

  };
  
  return stats;
};

export default sizeStats;

