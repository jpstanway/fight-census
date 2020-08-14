import data from "../../../data/rankings";
import getFightersAlphabetical from "../../../utils/getFightersAlphabetical";

const handler = (req, res) => {
  const fighters = getFightersAlphabetical(data);

  res.status(200).json({ fighters });
};

export default handler;
