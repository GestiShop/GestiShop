/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import sinon from 'sinon';
import * as time from './utils/time';
import {
  fetchWarehouseById,
  fetchWarehouses,
  upsertWarehouse,
} from '../../src/db';
import {
  clearDatabase,
  closeDatabase,
  connectDatabase,
} from './utils/database-config';
import { Warehouse, DBHelperResponse } from '../../src/model';
import { SampleWarehouse00, SampleWarehouse01 } from './samples';
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

describe('Warehouse helper', () => {
  it('Fetch all (empty)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Warehouse>> = {
      result: [],
      error: null,
    };
    const response = await fetchWarehouses();

    expect(response).toEqual(sampleResponse);
  });

  it('Insert (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertWarehouse(SampleWarehouse00);

      expect(response).toEqual(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Warehouse>> = {
        result: [SampleWarehouse00],
        error: null,
      };

      const response = await fetchWarehouses();

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

      const warehouse: Warehouse = SampleWarehouse01;
      warehouse.id = (await fetchWarehouses()).result?.[0]?.id;

      const response = await upsertWarehouse(warehouse);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Warehouse>> = {
        result: [SampleWarehouse01],
        error: null,
      };

      const response = await fetchWarehouses();

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
  });

  it('Fetch all (with results)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Warehouse>> = {
      result: [SampleWarehouse01],
      error: null,
    };
    const response = await fetchWarehouses();

    expect(_.isMatch(response, sampleResponse)).toEqual(true);
  });

  it('Fetch by id', async () => {
    expect.assertions(1);

    const warehouse: Warehouse = SampleWarehouse01;
    warehouse.id = (await fetchWarehouses()).result?.[0]?.id;

    const sampleResponse: DBHelperResponse<Warehouse> = {
      result: warehouse,
      error: null,
    };

    const response =
      warehouse.id !== undefined
        ? await fetchWarehouseById(warehouse.id)
        : undefined;

    expect(
      response === undefined //
        ? false
        : _.isMatch(response, sampleResponse)
    ).toEqual(true);
  });
});
