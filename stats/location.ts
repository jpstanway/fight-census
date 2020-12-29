import useCache from '../database/useCache';
import { getAllFighters } from '../database/api/fighters';
import { Fighter } from '../types';

const locationStats = async () => {
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

  return { stats, next: '/experience' };
};

export default locationStats;