import { Types } from 'mongoose';

export type DBHelperResponse<T> = {
  error: {
    code: number;
    message: string;
  } | null;
  result: T | null;
};

export type Event = {
  id?: Types.ObjectId;
  start: Date;
  end: Date;
  title: string;
  description?: string;
  allDay?: boolean;
  colorCode?: string;
};
