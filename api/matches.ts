import Match from '../database/models/Match';

export const getAllMatches = async () => {
  const result = await Match.find({});
  const matches = result.map((doc) => {
    const match = doc.toObject();
    match._id = match._id.toString();
    return match;
  });

  return matches;
};