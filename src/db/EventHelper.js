/* eslint-disable no-underscore-dangle */
import { Event } from '../model/EventModel';

const addEvent = (event, errorCallback, resultCallback) => {
  const dbEvent = new Event(event);
  dbEvent.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchEvents = (errorCallback, resultCallback) => {
  return Event.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateEvent = (event, errorCallback, resultCallback) => {
  const query = { _id: event._id };
  return Event.findOneAndUpdate(query, event, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

export { addEvent, fetchEvents, updateEvent };
