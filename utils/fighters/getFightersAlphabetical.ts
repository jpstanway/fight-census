export default (data) => {
  let fighters = [];

  for (const division in data) {
    if (division !== "p4p") {
      fighters = [...fighters, ...data[division].rankings];
    }
  }

  // sort fighters alphabetically
  fighters.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return fighters;
};
