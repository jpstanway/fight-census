import mongoose from 'mongoose';
const { Schema } = mongoose;

interface FighterDoc extends mongoose.Document {
  name: string,
  link: string,
  height: string,
  weight: string,
  division: string,
  reach: string
}

const fighterSchema = new Schema({
  name: { type: String, unique: true },
  link: String,
  height: String,
  weight: String,
  division: String,
  reach: String
});

export const getFighterModel = (year: string = '') => {
  let model = 'Fighter';
  if (year) {
    model += year;
  }
  return mongoose.models[model] || mongoose.model<FighterDoc>(model, fighterSchema);
};

export default mongoose.models.Fighter || mongoose.model<FighterDoc>('Fighter', fighterSchema);