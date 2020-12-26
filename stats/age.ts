import useCache from '../database/useCache';
import { getAllFighters } from '../database/api/fighters';
import { Fighter } from '../types';

const ageStats = async () => {
  const fighters = await useCache('fighters', getAllFighters);
  const stats = [];

  const ageGroups = () => {
    let young = 0; // 18-24
    let prime = 0; // 25-34
    let middle = 0; // 34-39
    let old = 0; // 40+
    let total = 0;

    fighters.forEach((fighter: Fighter) => {
      const age = parseInt(fighter.age);

      if (age <= 24) young++;
      if (age > 24 && age <= 34) prime++;
      if (age > 34 && age <= 39) middle++;
      if (age > 39) old++;
      total++;
    });

    return {
      id: "age",
      type: "pie",
      title: "Current age groups (%)",
      labels: ["18-24", "25-34", "35-39", "40+"],
      stats: [
        Math.ceil((young / total) * 100),
        Math.ceil((prime / total) * 100),
        Math.ceil((middle / total) * 100),
        Math.ceil((old / total) * 100)
      ]
    };
  };
  stats.push(ageGroups());

  const medianVsChampionsAge = () => {
    let median = 0;
    let champions = 0;
    let champCount = 0;

    fighters.forEach((fighter: Fighter) => {
      median += parseInt(fighter.age);

      if (fighter.isChampion) {
        champions += parseInt(fighter.age);
        champCount++;
      }
    });

    const medianStat = { 
      group: "All", 
      stat: Math.round(median / fighters.length)
    };
    const championsStat = { 
      group: "Champions", 
      stat: Math.round(champions / champCount)
    };

    return {
      type: "table",
      title: "Median age for all fighters vs median for champions",
      labels: ["Group", "Median age"],
      stats: [medianStat, championsStat],
      component: "MedianAgeTable"
    };
  };
  stats.push(medianVsChampionsAge());

  const oldestAndYoungest = () => {

  };

  return { stats, next: '/location' };
};

export default ageStats;