import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data/divisionApiTitles";
import getFightersAlphabetical from "../../../utils/fighters/getFightersAlphabetical";
import aggregateByCountry from "../../../utils/fighters/aggregateByCountry";

const fightersFilterHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const countries = aggregateByCountry(getFightersAlphabetical(data));

  if (countries) {
    res.status(200).json(countries);
  } else {
    res.status(404).json({ message: "There was a problem loading the data" });
  }
};

export default fightersFilterHandler;
