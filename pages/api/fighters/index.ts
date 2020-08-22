import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data/rankings";
import getFightersAlphabetical from "../../../utils/getFightersAlphabetical";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const fighters = getFightersAlphabetical(data);

  res.status(200).json({ fighters });
};

export default handler;
