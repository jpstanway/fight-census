import { NextApiRequest, NextApiResponse } from "next";
import data from "./RankingsData";

interface Fighter {
  name: string;
  wins: number;
  losses: number;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pid },
  } = req;

  const rankings: Fighter[] = data[pid];

  if (rankings) {
    res.status(200).json({ rankings });
  } else {
    res.status(404).send("Rankings not found");
  }
};
