/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import sinon from 'sinon';
import * as time from './utils/time';
import {
  fetchUnitTypeById,
  fetchUnitTypes,
  upsertUnitType,
} from '../../src/db';
import {
  clearDatabase,
  closeDatabase,
  connectDatabase,
} from './utils/database-config';
import { DBHelperResponse, UnitType } from '../../src/model';
import { SampleUnitType00, SampleUnitType01 } from './samples';
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

describe('UnitType helper', () => {
  it('Fetch all (empty)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<UnitType>> = {
      result: [],
      error: null,
    };
    const response = await fetchUnitTypes();

    expect(_.isMatch(response, sampleResponse)).toEqual(true);
  });

  it('Insert (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertUnitType(SampleUnitType00);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<UnitType>> = {
        result: [SampleUnitType00],
        error: null,
      };

      const response = await fetchUnitTypes();

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

      const unitType: UnitType = SampleUnitType01;
      unitType.id = (await fetchUnitTypes()).result?.[0]?.id;

      const response = await upsertUnitType(unitType);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<UnitType>> = {
        result: [SampleUnitType01],
        error: null,
      };

      const response = await fetchUnitTypes();

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
  });

  it('Fetch all (with results)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<UnitType>> = {
      result: [SampleUnitType01],
      error: null,
    };
    const response = await fetchUnitTypes();

    expect(_.isMatch(response, sampleResponse)).toEqual(true);
  });

  it('Fetch by id', async () => {
    expect.assertions(1);

    const unitType: UnitType = SampleUnitType01;
    unitType.id = (await fetchUnitTypes()).result?.[0]?.id;

    const sampleResponse: DBHelperResponse<UnitType> = {
      result: unitType,
      error: null,
    };

    const response =
      unitType.id !== undefined
        ? await fetchUnitTypeById(unitType.id)
        : undefined;

    expect(
      response === undefined //
        ? false
        : _.isMatch(response, sampleResponse)
    ).toEqual(true);
  });
});
