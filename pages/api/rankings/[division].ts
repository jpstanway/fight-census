import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data/rankings";

const rankingsHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { rankings, division } = data[req.query.division];

  if (division) {
    res.status(200).json({ rankings, division });
  } else {
    res.status(404).json({ message: "Rankings not found" });
  }
};

export default rankingsHandler;
