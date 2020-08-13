import data from "../../../data/cards";

const cardsHandler = (req, res) => {
  const { cards, timeline } = data[req.query.timeline];

  if (timeline) {
    res.status(200).json({ cards, timeline });
  } else {
    res.status(404).json({ message: "Cards not found" });
  }
};

export default cardsHandler;
