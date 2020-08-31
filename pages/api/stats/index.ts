import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data/stats";
import getAllStats from "../../../utils/stats/getAllStats";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  let stats = getAllStats(data);

  res.status(200).json({ stats });
};

export default handler;
