import data from "../../../data/rankings";
import capitalizer from "../../../utils/capitalizer";

const rankingsHandler = (req, res) => {
  const rankings = data[req.query.division];
  const division = capitalizer(req.query.division);

  if (division) {
    res.status(200).json({ rankings, division });
  } else {
    res.status(404).json({ message: "Rankings not found" });
  }
};

export default rankingsHandler;
