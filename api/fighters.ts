import Fighter from '../database/models/Fighter';

export const getAllFighters = async () => {
  const result = await Fighter.find({});
  const fighters = result.map((doc) => {
    const fighter = doc.toObject();
    fighter._id = fighter._id.toString();
    return fighter;
  });

  return fighters;
};