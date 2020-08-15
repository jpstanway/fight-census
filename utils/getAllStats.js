export default (data) => {
  let stats = [];

  for (const stat in data) {
    stats = [...stats, ...data[stat].stats];
  }

  return stats;
};
