import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data/divisionApiTitles";
import getFightersAlphabetical from "../../../utils/fighters/getFightersAlphabetical";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const fighters = getFightersAlphabetical(data);

  res.status(200).json({ fighters });
};

export default handler;
