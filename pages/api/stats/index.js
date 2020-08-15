import data from "../../../data/stats";
import getAllStats from "../../../utils/getAllStats";

const handler = (req, res) => {
  let stats = getAllStats(data);

  res.status(200).json({ stats });
};

export default handler;
