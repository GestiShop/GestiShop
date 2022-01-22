/* eslint-disable no-underscore-dangle */

import { CalendarEvent, Tax, UnitType } from '../types';

export const decodeCalendarEvent = (dbEvent: any): CalendarEvent => {
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

export const decodeTax = (dbTax: any): Tax => {
  return {
    id: dbTax._id,
    reference: dbTax.reference,
    percentage: dbTax.percentage,
  };
};

export const decodeUnitType = (dbUnitType: any): UnitType => {
  return {
    id: dbUnitType._id,
    reference: dbUnitType.reference,
    unit: dbUnitType.unit,
  };
};
