export default (division: string) => {
  division = division.replace(/-/g, " ");

  if (division.startsWith('womens')) {
    division = division.replace("womens", "women's");
  } else if (division.startsWith('mens')) {
    division = division.replace("mens", "men's");
  }

  return division;
};