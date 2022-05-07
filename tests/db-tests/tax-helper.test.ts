/**
 * @jest-environment node
 */

import sinon from 'sinon';
import * as time from './utils/time';
import { fetchTaxById, fetchTaxes, upsertTax } from '../../src/db';
import {
  clearDatabase,
  closeDatabase,
  connectDatabase,
} from './utils/database-config';
import { DBHelperResponse, Tax } from '../../src/model';
import { SampleTax00, SampleTax01 } from './samples';
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

describe('Tax helper', () => {
  it('Fetch all (empty)', async () => {
    const sampleResponse: DBHelperResponse<Array<Tax>> = {
      result: [],
      error: null,
    };
    const response = await fetchTaxes();

    expect(response) //
      .to.deep.equal(sampleResponse);
  });

  it('Insert (one)', async () => {
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertTax(SampleTax00);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Tax>> = {
        result: [SampleTax00],
        error: null,
      };

      const response = await fetchTaxes();

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

      const tax: Tax = SampleTax01;
      tax.id = (await fetchTaxes()).result?.[0]?.id;

      const response = await upsertTax(tax);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Tax>> = {
        result: [SampleTax01],
        error: null,
      };

      const response = await fetchTaxes();

      expect(response) //
        .excludingEvery(['id'])
        .to.deep.equal(sampleResponse);
    }
  });

  it('Fetch all (with results)', async () => {
    const sampleResponse: DBHelperResponse<Array<Tax>> = {
      result: [SampleTax01],
      error: null,
    };
    const response = await fetchTaxes();

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });

  it('Fetch by id', async () => {
    const tax: Tax = SampleTax01;
    tax.id = (await fetchTaxes()).result?.[0]?.id;

    const sampleResponse: DBHelperResponse<Tax> = {
      result: tax,
      error: null,
    };

    const response =
      tax.id !== undefined ? await fetchTaxById(tax.id) : undefined;

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });
});
