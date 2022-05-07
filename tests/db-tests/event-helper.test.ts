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
import * as chai from 'chai';
import chaiExclude from 'chai-exclude';

// Config needed because of mongoose
sinon.stub(time, 'setTimeout');

// Configure timeout of each test
jest.setTimeout(35000);

// Configure chai and chai-exclude
chai.use(chaiExclude);
const expect: Chai.ExpectStatic = chai.expect;

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe('Calendar event helper', () => {
  it('Fetch all (empty)', async () => {
    const sampleResponse: DBHelperResponse<Array<CalendarEvent>> = {
      result: [],
      error: null,
    };
    const response = await fetchEvents();

    expect(response) //
      .to.deep.equal(sampleResponse);
  });

  it('Insert (one)', async () => {
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertEvent(SampleCalendarEvent00);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<CalendarEvent>> = {
        result: [SampleCalendarEvent00],
        error: null,
      };

      const response = await fetchEvents();

      expect(response) //
        .excludingEvery(['id'])
        .to.deep.equal(sampleResponse);
    }
  });

  it('Update (one)', async () => {
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const calendarEvent: CalendarEvent = SampleCalendarEvent01;
      calendarEvent.id = (await fetchEvents()).result?.[0]?.id;

      const response = await upsertEvent(calendarEvent);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<CalendarEvent>> = {
        result: [SampleCalendarEvent01],
        error: null,
      };

      const response = await fetchEvents();

      expect(response) //
        .excludingEvery(['id'])
        .to.deep.equal(sampleResponse);
    }
  });

  it('Fetch all (with results)', async () => {
    const sampleResponse: DBHelperResponse<Array<CalendarEvent>> = {
      result: [SampleCalendarEvent01],
      error: null,
    };
    const response = await fetchEvents();

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });
});
