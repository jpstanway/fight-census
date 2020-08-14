export default (data) => {
  let countries = {};

  data.forEach((fighter) => {
    if (!countries[fighter.country]) {
      countries[fighter.country] = [];
    }

    countries[fighter.country].push(fighter);
  });

  return countries;
};
