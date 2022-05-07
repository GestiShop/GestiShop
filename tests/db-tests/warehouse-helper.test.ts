/**
 * @jest-environment node
 */

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

describe('Warehouse helper', () => {
  it('Fetch all (empty)', async () => {
    const sampleResponse: DBHelperResponse<Array<Warehouse>> = {
      result: [],
      error: null,
    };
    const response = await fetchWarehouses();

    expect(response) //
      .to.deep.equal(sampleResponse);
  });

  it('Insert (one)', async () => {
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertWarehouse(SampleWarehouse00);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Warehouse>> = {
        result: [SampleWarehouse00],
        error: null,
      };

      const response = await fetchWarehouses();

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

      const warehouse: Warehouse = SampleWarehouse01;
      warehouse.id = (await fetchWarehouses()).result?.[0]?.id;

      const response = await upsertWarehouse(warehouse);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Warehouse>> = {
        result: [SampleWarehouse01],
        error: null,
      };

      const response = await fetchWarehouses();

      expect(response) //
        .excludingEvery(['id'])
        .to.deep.equal(sampleResponse);
    }
  });

  it('Fetch all (with results)', async () => {
    const sampleResponse: DBHelperResponse<Array<Warehouse>> = {
      result: [SampleWarehouse01],
      error: null,
    };
    const response = await fetchWarehouses();

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });

  it('Fetch by id', async () => {
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

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });
});
