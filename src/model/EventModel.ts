import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  title: { type: String, required: true },
  description: String,
  allDay: Boolean,
  colorCode: String,
});

const Event = model('Event', eventSchema, 'events');

export { eventSchema, Event };
