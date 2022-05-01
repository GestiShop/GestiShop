/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import sinon from 'sinon';
import * as time from './time';
import { fetchTaxById, fetchTaxes, upsertTax } from '../../src/db';
import { closeDatabase, connectDatabase } from './database-config';
import { DBHelperResponse, Tax } from '../../src/model';
import { Types } from 'mongoose';

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

    expect(response).toEqual(sampleResponse);
  });

  it('Insert (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const tax: Tax = {
        reference: 'IVA00',
        percentage: 0,
      };
      const response = await upsertTax(tax);

      expect(response).toEqual(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Tax>> = {
        result: [
          {
            reference: 'IVA00',
            percentage: 0,
          },
        ],
        error: null,
      };

      const response = await fetchTaxes();

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

      const tax: Tax = {
        id: (await fetchTaxes()).result?.[0]?.id,
        reference: 'IVA10',
        percentage: 10,
      };
      const response = await upsertTax(tax);

      expect(response).toEqual(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Tax>> = {
        result: [
          {
            reference: 'IVA10',
            percentage: 10,
          },
        ],
        error: null,
      };

      const response = await fetchTaxes();

      expect(response).toMatchObject(sampleResponse);
    }
  });

  it('Fetch all (with results)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Tax>> = {
      result: [
        {
          reference: 'IVA10',
          percentage: 10,
        },
      ],
      error: null,
    };
    const response = await fetchTaxes();

    expect(response).toMatchObject(sampleResponse);
  });

  it('Fetch by id', async () => {
    expect.assertions(1);

    const id: Types.ObjectId | undefined = (await fetchTaxes()).result?.[0]?.id;
    const sampleResponse: DBHelperResponse<Tax> = {
      result: {
        id,
        reference: 'IVA10',
        percentage: 10,
      },
      error: null,
    };

    const response = id !== undefined ? await fetchTaxById(id) : undefined;

    expect(response).toEqual(sampleResponse);
  });
});
