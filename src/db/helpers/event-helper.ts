/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import {
  CalendarEvent,
  DBCalendarEvent,
  DBHelperResponse,
  decodeCalendarEvent,
} from '../../model';

export const upsertEvent = (
  event: CalendarEvent
): Promise<DBHelperResponse<boolean>> => {
  let queryPromise;
  if (event.id == null) {
    // Insert
    const dbEvent = new DBCalendarEvent(event);
    queryPromise = dbEvent.save();
  } else {
    // Update
    queryPromise = DBCalendarEvent.findOneAndUpdate(
      { _id: event.id },
      event
    ).exec();
  }

  return queryPromise
    .then((_: any) => {
      return {
        error: null,
        result: true,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};

export const fetchEvents = (): Promise<
  DBHelperResponse<Array<CalendarEvent>>
> => {
  return DBCalendarEvent.find({})
    .exec()
    .then((data: any) => {
      const eventList: Array<CalendarEvent> = data.map((x: any) =>
        decodeCalendarEvent(x)
      );

      return {
        error: null,
        result: eventList,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};

export const deleteEvent = (
  id: Types.ObjectId
): Promise<DBHelperResponse<boolean>> => {
  return DBCalendarEvent.findByIdAndDelete(id)
    .exec()
    .then((_: any) => {
      return {
        error: null,
        result: true,
      };
    })
    .catch((error: any) => {
      return {
        error: {
          code: -1,
          message: error,
        },
        result: null,
      };
    });
};
