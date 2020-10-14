export const formatDivisionString = (division: string) => {
  division = division.replace(/-/g, " ");

  if (division.startsWith('womens')) {
    division = division.replace("womens", "women's");
  } else if (division.startsWith('mens')) {
    division = division.replace("mens", "men's");
  }

  return division;
};

export const combineDivisionData = (rankings: any, divisionData: any) => {
  return rankings.map((fighter: any) => {
    const { link, name } = fighter;
    const addtlData = divisionData.find((f: any, i: number, arr: any) => {
      if (f.link === link || f.name === name) {
        const data = f;
        arr.splice(i, 1);
        return data;
      }
    });

    return { ...fighter, ...addtlData };
  })
};