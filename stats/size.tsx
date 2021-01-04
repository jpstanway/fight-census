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

    return {
      id: "size",
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
        biggest = compareSize("Heavyweight", 1, biggest, fighter);
        return;
      }
      // light heavyweight
      if (weight > 200 && weight < 209) {
        biggest = compareSize("Light Heavyweight", 2, biggest, fighter);
        return;
      }
      // middleweight
      if (weight > 180 && weight < 189) {
        biggest = compareSize("Middleweight", 3, biggest, fighter);
        return;
      }
      // welterweight
      if (weight > 165 && weight < 174) {
        biggest = compareSize("Welterweight", 4, biggest, fighter);
        return;
      }
      // lightweight
      if (weight > 150 && weight < 159) {
        biggest = compareSize("Lightweight", 5, biggest, fighter);
        return;
      }
      // featherweight
      if (weight > 140 && weight < 149 && !fighter.division?.includes("Women's")) {
        biggest = compareSize("Featherweight", 6, biggest, fighter);
        return;
      }
      // bantamweight
      if (weight > 130 && weight < 139 && !fighter.division?.includes("Women's")) {
        biggest = compareSize("Bantamweight", 7, biggest, fighter);
        return;
      }
      // flyweight
      if (weight > 120 && weight < 129 && !fighter.division?.includes("Women's")) {
        biggest = compareSize("Flyweight", 8, biggest, fighter);
        return;
      }
      // womens featherweight
      if (weight > 140 && weight < 149) {
        biggest = compareSize("Women's Featherweight", 9, biggest, fighter);
        return;
      }
      // womens bantamweight
      if (weight > 130 && weight < 139) {
        biggest = compareSize("Women's Bantamweight", 10, biggest, fighter);
        return;
      }
      // womens flyweight
      if (weight > 120 && weight < 129) {
        biggest = compareSize("Women's Flyweight", 11, biggest, fighter);
        return;
      }
      // womens strawweight
      if (weight > 110 && weight < 119) {
        biggest = compareSize("Women's Strawweight", 12, biggest, fighter);
        return;
      }
    });

    // create an array out of the object
    Object.keys(biggest).forEach((div) => stats.push(biggest[div]));
    stats.sort((a, b) => a.index - b.index);

    return {
      type: "table",
      title: "Biggest fighters by division",
      labels: ["Division", "Name", "Height", "Reach"],
      stats,
      component: 'BiggestFightersTable'
    };
  };
  stats.push(biggestFightersByDivision());

  // weight switching fighters win rate
  // const divisionSwapWinRate = () => {
  //   let reds: string[] = [];
  //   let blues: string[] = [];

  //   const swappers = fighters.filter((fighter: Fighter) => {
  //     return fighter.allDivisions && fighter.allDivisions.length > 1;
  //   });

  //   swappers.forEach((swapper: Fighter) => {
  //     if (swapper.allDivisions) {
  //       const latest = swapper.allDivisions[swapper.allDivisions.length - 1];
        
  //       // search for potential win in matches
  //       combined.forEach((match: Match) => {
  //         if (match.red.name === swapper.name && match.division === latest) {
  //           if (reds.includes(match.red.name)) return;
  //           reds.push(match.red.name);
  //         }

  //         if (match.blue.name === swapper.name && match.division === latest) {
  //           if (blues.includes(match.blue.name)) return;
  //           blues.push(match.blue.name);
  //         }
  //       });
  //     }
  //   });
    
  //   let rate = reds.length / (reds.length + blues.length);
  //   rate = Math.round(rate *= 100);
  //   let stat = rate.toString() + '%';

  //   return {
  //     type: "single",
  //     color: "red",
  //     title: "Result of fighters who switch divisions",
  //     labels: ["Win rate"],
  //     stats: [stat]
  //   };
  // };
  // stats.push(divisionSwapWinRate());

  // number of champions who are big for their weight class
  const championsAboveAverageSize = () => {
    const divisionAvgs: any = {};
    const stats: any[] = [];

    // collect total size data for each division
    fighters.forEach((fighter: Fighter) => {
      const fighterDiv = fighter.division.toLowerCase();
      if (!divisionAvgs.hasOwnProperty(fighterDiv)) {
        divisionAvgs[fighterDiv] = {
          division: fighter.division,
          avg: 0,
          count: 0,
          total: 0,
          champion: '',
          championAvg: 0
        } ;
      }

      if (fighter.height && fighter.reach) {
        const height = convertHeight(fighter.height);
        const reach = convertReach(fighter.reach);

        if (typeof height === 'number') {
          const total = height + reach;

          if (fighter.isChampion) {
            divisionAvgs[fighterDiv].champion = fighter.name;
            divisionAvgs[fighterDiv].championAvg = total;

            // special case for women's bw
            if (fighter.name === 'Amanda Nunes') {
              divisionAvgs["women's bantamweight"].champion = fighter.name;
              divisionAvgs["women's bantamweight"].championAvg = total;
              divisionAvgs["women's bantamweight"].total += total;
              divisionAvgs["women's bantamweight"].count += 1;
              divisionAvgs["women's bantamweight"].avg = divisionAvgs["women's bantamweight"].total / divisionAvgs["women's bantamweight"].count;
            }
          }

          divisionAvgs[fighterDiv].total += total;
          divisionAvgs[fighterDiv].count += 1;
          divisionAvgs[fighterDiv].avg = divisionAvgs[fighterDiv].total / divisionAvgs[fighterDiv].count;
        }
      }
    });

    // create an array out of the object
    Object.keys(divisionAvgs).forEach((div) => {
      divisionAvgs[div].avg = Math.round(divisionAvgs[div].avg);
      stats.push(divisionAvgs[div])
    });

    // sort weight classes
    stats.sort((a, b) => b.avg - a.avg);
    
    return {
      type: "table",
      title: "Champions vs avg size of division",
      labels: ["Division", "Comparison (total height + reach)"],
      stats,
      component: 'DivisionAvgTable'
    };
  };
  stats.push(championsAboveAverageSize());

  return { stats, next: '/age' };
};

export default sizeStats;