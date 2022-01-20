/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import { decodeEvent } from '../model/decoders';
import { Event, DBEvent, DBHelperResponse } from '../model/types';

export const upsertEvent = (
  event: Event
): Promise<DBHelperResponse<boolean>> => {
  if (event.id == null) {
    // Insert
    const dbEvent = new DBEvent(event);
    return dbEvent
      .save()
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
  } else {
    // Update
    return DBEvent.findOneAndUpdate({ _id: event.id }, event)
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
  }
};

export const fetchEvents = (): Promise<DBHelperResponse<Array<Event>>> => {
  return DBEvent.find({})
    .exec()
    .then((data: any) => {
      const eventList: Array<Event> = data.map((x: any) => decodeEvent(x));

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
  return DBEvent.findByIdAndDelete(id)
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
