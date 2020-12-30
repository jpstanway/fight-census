import useCache from '../database/useCache';
import { getAllFighters } from '../database/api/fighters';
import { combineAllData } from '../database/utils';
import { Fighter, Event, Match } from '../types';

const locationStats = async () => {
  const combinedAll = await useCache("combinedAll", combineAllData);
  const fighters = await useCache("fighters", getAllFighters);
  const stats = [];

  const fightersByCountryOfOrigin = () => {
    type Total = { [key: string]: number };
    type Stat = { country: string, count: number };
    const countries: Total = {};
    const stats: Stat[] = [];

    fighters.forEach((fighter: Fighter) => {
      const country = fighter.country;
      
      if (countries[country]) {
        countries[country]++;
      } else {
        countries[country] = 1;
      }
    });

    // create an array out of the object
    Object.keys(countries).forEach((country) => stats.push({ country, count: countries[country] }));
    stats.sort((a, b) => b.count - a.count);

    return {
      type: "table",
      title: "Number of fighters by country of origin",
      labels: ["Country", "No. of Active Fighters"],
      stats,
      component: 'CountryOfOriginTable'
    };
  };
  stats.push(fightersByCountryOfOrigin());

  const homeCountryWinRate = () => {
    let wins = 0, counted = 0;

    combinedAll.forEach((event: Event) => {
      const country = event.country;

      event.matches?.forEach((match: Match) => {
        if (match.red.country === country && match.blue.country !== country) {
          wins++;
          counted++;
          return;
        }
        if (match.blue.country === country && match.red.country !== country) {
          counted++;
          return;
        }
      });
    });

    const rate = Math.ceil((wins / counted) * 100) + '%';

    return {
      type: "single",
      color: "green",
      title: "Home country advantage",
      labels: ["Win rate"],
      stats: [rate]
    }
  };
  stats.push(homeCountryWinRate());

  return { stats, next: '/experience' };
};

export default locationStats;