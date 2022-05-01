/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import sinon from 'sinon';
import * as time from './utils/time';
import { fetchTaxById, fetchTaxes, upsertTax } from '../../src/db';
import { closeDatabase, connectDatabase } from './utils/database-config';
import { DBHelperResponse, Tax } from '../../src/model';
import { SampleTax00, SampleTax01 } from './samples';
import * as _ from 'lodash';

sinon.stub(time, 'setTimeout');
jest.setTimeout(35000);

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Tax helper', () => {
  it('Fetch all (empty)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Tax>> = {
      result: [],
      error: null,
    };
    const response = await fetchTaxes();

    expect(_.isMatch(response, sampleResponse)).toEqual(true);
  });

  it('Insert (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertTax(SampleTax00);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Tax>> = {
        result: [SampleTax00],
        error: null,
      };

      const response = await fetchTaxes();

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

      const tax: Tax = SampleTax01;
      tax.id = (await fetchTaxes()).result?.[0]?.id;

      const response = await upsertTax(tax);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Tax>> = {
        result: [SampleTax01],
        error: null,
      };

      const response = await fetchTaxes();

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
  });

  it('Fetch all (with results)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Tax>> = {
      result: [SampleTax01],
      error: null,
    };
    const response = await fetchTaxes();

    expect(_.isMatch(response, sampleResponse)).toEqual(true);
  });

  it('Fetch by id', async () => {
    expect.assertions(1);

    const tax: Tax = SampleTax01;
    tax.id = (await fetchTaxes()).result?.[0]?.id;

    const sampleResponse: DBHelperResponse<Tax> = {
      result: tax,
      error: null,
    };

    const response =
      tax.id !== undefined ? await fetchTaxById(tax.id) : undefined;

    expect(
      response === undefined //
        ? false
        : _.isMatch(response, sampleResponse)
    ).toEqual(true);
  });
});
