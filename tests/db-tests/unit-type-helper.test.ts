/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import sinon from 'sinon';
import * as time from './time';
import {
  fetchUnitTypeById,
  fetchUnitTypes,
  upsertUnitType,
} from '../../src/db';
import { closeDatabase, connectDatabase } from './database-config';
import { DBHelperResponse, UnitType } from '../../src/model';
import { Types } from 'mongoose';

sinon.stub(time, 'setTimeout');
jest.setTimeout(35000);

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
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

    expect(response).toEqual(sampleResponse);
  });

  it('Insert (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const unitType: UnitType = {
        reference: 'UNIT',
        unit: 'u',
      };
      const response = await upsertUnitType(unitType);

      expect(response).toEqual(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<UnitType>> = {
        result: [
          {
            reference: 'UNIT',
            unit: 'u',
          },
        ],
        error: null,
      };

      const response = await fetchUnitTypes();

      expect(response).toMatchObject(sampleResponse);
    }
  });

  it('Update (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const unitType: UnitType = {
        id: (await fetchUnitTypes()).result?.[0]?.id,
        reference: 'KILO',
        unit: 'k',
      };
      const response = await upsertUnitType(unitType);

      expect(response).toEqual(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<UnitType>> = {
        result: [
          {
            reference: 'KILO',
            unit: 'k',
          },
        ],
        error: null,
      };

      const response = await fetchUnitTypes();

      expect(response).toMatchObject(sampleResponse);
    }
  });

  it('Fetch all (with results)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<UnitType>> = {
      result: [
        {
          reference: 'KILO',
          unit: 'k',
        },
      ],
      error: null,
    };
    const response = await fetchUnitTypes();

    expect(response).toMatchObject(sampleResponse);
  });

  it('Fetch by id', async () => {
    expect.assertions(1);

    const id: Types.ObjectId | undefined = (await fetchUnitTypes()).result?.[0]
      ?.id;
    const sampleResponse: DBHelperResponse<UnitType> = {
      result: {
        id,
        reference: 'KILO',
        unit: 'k',
      },
      error: null,
    };

    const response = id !== undefined ? await fetchUnitTypeById(id) : undefined;

    expect(response).toEqual(sampleResponse);
  });
});
