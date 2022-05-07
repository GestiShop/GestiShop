/**
 * @jest-environment node
 */

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

describe('UnitType helper', () => {
  it('Fetch all (empty)', async () => {
    const sampleResponse: DBHelperResponse<Array<UnitType>> = {
      result: [],
      error: null,
    };
    const response = await fetchUnitTypes();

    expect(response) //
      .to.deep.equal(sampleResponse);
  });

  it('Insert (one)', async () => {
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertUnitType(SampleUnitType00);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<UnitType>> = {
        result: [SampleUnitType00],
        error: null,
      };

      const response = await fetchUnitTypes();

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

      const unitType: UnitType = SampleUnitType01;
      unitType.id = (await fetchUnitTypes()).result?.[0]?.id;

      const response = await upsertUnitType(unitType);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<UnitType>> = {
        result: [SampleUnitType01],
        error: null,
      };

      const response = await fetchUnitTypes();

      expect(response) //
        .excludingEvery(['id'])
        .to.deep.equal(sampleResponse);
    }
  });

  it('Fetch all (with results)', async () => {
    const sampleResponse: DBHelperResponse<Array<UnitType>> = {
      result: [SampleUnitType01],
      error: null,
    };
    const response = await fetchUnitTypes();

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });

  it('Fetch by id', async () => {
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

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });
});
