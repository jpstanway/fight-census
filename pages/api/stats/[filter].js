import data from "../../../data/stats";

const statsFilterHandler = (req, res) => {
  const { stats, name } = data[req.query.filter];

  if (name) {
    res.status(200).json({ stats, name });
  } else {
    res.status(404).json({ message: "Stats not found" });
  }
};

export default statsFilterHandler;
