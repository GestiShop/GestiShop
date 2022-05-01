/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import sinon from 'sinon';
import * as time from './utils/time';
import { fetchEvents, upsertEvent } from '../../src/db';
import {
  clearDatabase,
  closeDatabase,
  connectDatabase,
} from './utils/database-config';
import { CalendarEvent, DBHelperResponse } from '../../src/model';
import { SampleCalendarEvent00, SampleCalendarEvent01 } from './samples';
import * as _ from 'lodash';

sinon.stub(time, 'setTimeout');
jest.setTimeout(35000);

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe('Calendar event helper', () => {
  it('Fetch all (empty)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<CalendarEvent>> = {
      result: [],
      error: null,
    };
    const response = await fetchEvents();

    expect(response).toEqual(sampleResponse);
  });

  it('Insert (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertEvent(SampleCalendarEvent00);

      expect(response).toEqual(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<CalendarEvent>> = {
        result: [SampleCalendarEvent00],
        error: null,
      };

      const response = await fetchEvents();

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
  });

  it('Update (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const calendarEvent: CalendarEvent = SampleCalendarEvent01;
      calendarEvent.id = (await fetchEvents()).result?.[0]?.id;

      const response = await upsertEvent(calendarEvent);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<CalendarEvent>> = {
        result: [SampleCalendarEvent01],
        error: null,
      };

      const response = await fetchEvents();

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
  });

  it('Fetch all (with results)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<CalendarEvent>> = {
      result: [SampleCalendarEvent01],
      error: null,
    };
    const response = await fetchEvents();

    expect(_.isMatch(response, sampleResponse)).toEqual(true);
  });
});
