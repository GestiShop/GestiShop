/**
 * @jest-environment node
 */

import sinon from 'sinon';
import * as time from './utils/time';
import {
  fetchCategories,
  fetchFullProducts,
  fetchProductById,
  fetchTaxes,
  fetchUnitTypes,
  fetchWarehouses,
  upsertCategory,
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
  SampleCategory00,
  SampleFullProduct00,
  SampleFullProduct01,
  SampleProduct00,
  SampleProduct01,
  SampleTax00,
  SampleUnitType00,
  SampleWarehouse00,
} from './samples';
import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Types } from 'mongoose';

// Config needed because of mongoose
sinon.stub(time, 'setTimeout');

// Configure timeout of each test
jest.setTimeout(35000);

// Configure chai and chai-exclude
chai.use(chaiExclude);
const expect: Chai.ExpectStatic = chai.expect;

let sampleProduct00: Product = SampleProduct00;
let sampleProduct01: Product = SampleProduct01;

beforeAll(async () => {
  await connectDatabase();

  await upsertTax(SampleTax00);
  await upsertWarehouse(SampleWarehouse00);
  await upsertUnitType(SampleUnitType00);
  await upsertCategory(SampleCategory00);

  const category: Types.ObjectId | undefined = (await fetchCategories())
    .result?.[0]?.id;

  const tax: Types.ObjectId | null =
    (await fetchTaxes()).result?.[0]?.id ?? null;
  const unitType: Types.ObjectId | null =
    (await fetchUnitTypes()).result?.[0]?.id ?? null;
  const warehouse: Types.ObjectId | null =
    (await fetchWarehouses()).result?.[0]?.id ?? null;

  sampleProduct00 = {
    ...sampleProduct00,
    buyingInfo: {
      ...sampleProduct00.buyingInfo,
      taxPercentage: tax,
    },
    sellingInfo: {
      ...sampleProduct00.sellingInfo,
      taxPercentage: tax,
    },
    unitType: unitType,
    warehouse: warehouse,
    categories: category !== undefined ? [category] : [],
  };

  sampleProduct01 = {
    ...sampleProduct01,
    buyingInfo: {
      ...sampleProduct01.buyingInfo,
      taxPercentage: tax,
    },
    sellingInfo: {
      ...sampleProduct01.sellingInfo,
      taxPercentage: tax,
    },
    unitType: unitType,
    warehouse: warehouse,
    categories: category !== undefined ? [category] : [],
  };
});

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe('Product helper', () => {
  it('Fetch all (empty)', async () => {
    const sampleResponse: DBHelperResponse<Array<Product>> = {
      result: [],
      error: null,
    };
    const response = await fetchFullProducts();

    expect(response) //
      .to.deep.equal(sampleResponse);
  });

  it('Insert (one)', async () => {
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertProduct(sampleProduct00);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<FullProduct>> = {
        result: [SampleFullProduct00],
        error: null,
      };

      const response = await fetchFullProducts();

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

      const product: Product = sampleProduct01;
      product.id = (await fetchFullProducts()).result?.[0]?.id;

      const response = await upsertProduct(product);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<FullProduct>> = {
        result: [SampleFullProduct01],
        error: null,
      };

      const response = await fetchFullProducts();

      expect(response) //
        .excludingEvery(['id'])
        .to.deep.equal(sampleResponse);
    }
  });

  it('Fetch all (with results)', async () => {
    const sampleResponse: DBHelperResponse<Array<FullProduct>> = {
      result: [SampleFullProduct01],
      error: null,
    };
    const response = await fetchFullProducts();

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });

  it('Fetch by id', async () => {
    const product: Product = sampleProduct01;
    product.id = (await fetchFullProducts()).result?.[0]?.id;

    const sampleResponse: DBHelperResponse<Product> = {
      result: product,
      error: null,
    };

    const response =
      product.id !== undefined ? await fetchProductById(product.id) : undefined;

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });
});
