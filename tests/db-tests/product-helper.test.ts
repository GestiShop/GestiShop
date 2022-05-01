/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import sinon from 'sinon';
import * as time from './utils/time';
import {
  fetchFullProducts,
  fetchProductById,
  fetchTaxes,
  fetchUnitTypes,
  fetchWarehouses,
  upsertProduct,
  upsertTax,
  upsertUnitType,
  upsertWarehouse,
} from '../../src/db';
import {
  clearDatabase,
  closeDatabase,
  connectDatabase,
} from './utils/database-config';
import { DBHelperResponse, FullProduct, Product } from '../../src/model';
import {
  SampleFullProduct00,
  SampleFullProduct01,
  SampleProduct00,
  SampleProduct01,
  SampleTax00,
  SampleUnitType00,
  SampleWarehouse00,
} from './samples';
import * as _ from 'lodash';

sinon.stub(time, 'setTimeout');
jest.setTimeout(35000);

let sampleProduct00: Product = SampleProduct00;
let sampleProduct01: Product = SampleProduct01;

beforeAll(async () => {
  await connectDatabase();

  await upsertTax(SampleTax00);
  await upsertWarehouse(SampleWarehouse00);
  await upsertUnitType(SampleUnitType00);

  sampleProduct00 = {
    ...sampleProduct00,
    buyingInfo: {
      ...sampleProduct00.buyingInfo,
      taxPercentage: (await fetchTaxes()).result?.[0]?.id ?? null,
    },
    sellingInfo: {
      ...sampleProduct00.sellingInfo,
      taxPercentage: (await fetchTaxes()).result?.[0]?.id ?? null,
    },
    unitType: (await fetchUnitTypes()).result?.[0]?.id ?? null,
    warehouse: (await fetchWarehouses()).result?.[0]?.id ?? null,
  };

  sampleProduct01 = {
    ...sampleProduct01,
    buyingInfo: {
      ...sampleProduct01.buyingInfo,
      taxPercentage: (await fetchTaxes()).result?.[0]?.id ?? null,
    },
    sellingInfo: {
      ...sampleProduct01.sellingInfo,
      taxPercentage: (await fetchTaxes()).result?.[0]?.id ?? null,
    },
    unitType: (await fetchUnitTypes()).result?.[0]?.id ?? null,
    warehouse: (await fetchWarehouses()).result?.[0]?.id ?? null,
  };
});

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe('Product helper', () => {
  it('Fetch all (empty)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Product>> = {
      result: [],
      error: null,
    };
    const response = await fetchFullProducts();

    expect(response).toEqual(sampleResponse);
  });

  it('Insert (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertProduct(sampleProduct00);

      expect(response).toEqual(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<FullProduct>> = {
        result: [SampleFullProduct00],
        error: null,
      };

      const response = await fetchFullProducts();

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

      const product: Product = sampleProduct01;
      product.id = (await fetchFullProducts()).result?.[0]?.id;

      const response = await upsertProduct(product);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<FullProduct>> = {
        result: [SampleFullProduct01],
        error: null,
      };

      const response = await fetchFullProducts();

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
  });

  it('Fetch all (with results)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<FullProduct>> = {
      result: [SampleFullProduct01],
      error: null,
    };
    const response = await fetchFullProducts();

    expect(_.isMatch(response, sampleResponse)).toEqual(true);
  });

  it('Fetch by id', async () => {
    expect.assertions(1);

    const product: Product = sampleProduct01;
    product.id = (await fetchFullProducts()).result?.[0]?.id;

    const sampleResponse: DBHelperResponse<Product> = {
      result: product,
      error: null,
    };

    const response =
      product.id !== undefined ? await fetchProductById(product.id) : undefined;

    expect(
      response === undefined //
        ? false
        : _.isMatch(response, sampleResponse)
    ).toEqual(true);
  });
});
