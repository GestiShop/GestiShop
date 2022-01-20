import { DBEvent, Event } from '../types';

export const decodeEvent = (dbEvent: any): Event => {
  return {
    id: dbEvent._id,
    start: dbEvent.start,
    end: dbEvent.end,
    title: dbEvent.title,
    description: dbEvent.description,
    allDay: dbEvent.allDay,
    colorCode: dbEvent.colorCode,
  };
};
