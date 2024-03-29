import mongoose from 'mongoose';
const { Schema } = mongoose;

interface EventDoc extends mongoose.Document {
  title: string,
  link: string,
  date: Date,
  venue: string,
  city: string,
  country: string
}

const eventSchema = new Schema({
  title: { type: String, unique: true },
  link: String,
  date: Date,
  venue: String,
  city: String,
  country: String
});


export const getEventModel = (year: string = '') => {
  let model = 'Event';
  if (year) {
    model += year;
  }
  return mongoose.models[model] || mongoose.model<EventDoc>(model, eventSchema);
};

export default mongoose.models.Event || mongoose.model<EventDoc>('Event', eventSchema);