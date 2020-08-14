import data from "../../../data/rankings";
import getFightersAlphabetical from "../../../utils/getFightersAlphabetical";
import aggregateByCountry from "../../../utils/aggregateByCountry";

const fightersFilterHandler = (req, res) => {
  const countries = aggregateByCountry(getFightersAlphabetical(data));

  if (countries) {
    res.status(200).json(countries);
  } else {
    res.status(404).json({ message: "There was a problem loading the data" });
  }
};

export default fightersFilterHandler;
