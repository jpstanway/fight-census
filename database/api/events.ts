import { getEventModel } from '../models/Event';

export const getAllEvents = async () => {
  const Event = getEventModel('2021');
  const result = await Event.find({});
  const events = result.map((doc) => {
    const event = doc.toObject();
    event._id = event._id.toString();
    event.date = event.date.toString();
    return event;
  });

  return events;
};