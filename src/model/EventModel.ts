const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  start: Date,
  end: Date,
  title: String,
  description: String,
  allDay: Boolean,
});

const Event = mongoose.model('Event', eventSchema, 'events');

export { eventSchema, Event };
