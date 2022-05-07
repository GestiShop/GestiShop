/**
 * @jest-environment node
 */

import sinon from 'sinon';
import * as time from './utils/time';
import {
  fetchCategories,
  fetchCategoryById,
  upsertCategory,
} from '../../src/db';
import {
  clearDatabase,
  closeDatabase,
  connectDatabase,
} from './utils/database-config';
import { Category, DBHelperResponse } from '../../src/model';
import {
  SampleCategory00,
  SampleCategory01,
  SampleCategory02,
} from './samples';
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

describe('Category helper', () => {
  it('Fetch all (empty)', async () => {
    const sampleResponse: DBHelperResponse<Array<Category>> = {
      result: [],
      error: null,
    };
    const response = await fetchCategories();

    expect(response) //
      .to.deep.equal(sampleResponse);
  });

  it('Insert (one)', async () => {
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertCategory(SampleCategory00);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Category>> = {
        result: [SampleCategory00],
        error: null,
      };

      const response = await fetchCategories();

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

      const category: Category = SampleCategory01;
      category.id = (await fetchCategories()).result?.[0]?.id;

      const response = await upsertCategory(category);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Category>> = {
        result: [SampleCategory01],
        error: null,
      };

      const response = await fetchCategories();

      expect(response) //
        .excludingEvery(['id'])
        .to.deep.equal(sampleResponse);
    }
  });

  it('Fetch all (with results)', async () => {
    const sampleResponse: DBHelperResponse<Array<Category>> = {
      result: [SampleCategory01],
      error: null,
    };
    const response = await fetchCategories();

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });

  it('Fetch by id', async () => {
    const category: Category = SampleCategory01;
    category.id = (await fetchCategories()).result?.[0]?.id;

    const sampleResponse: DBHelperResponse<Category> = {
      result: category,
      error: null,
    };

    const response =
      category.id !== undefined
        ? await fetchCategoryById(category.id)
        : undefined;

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });

  it('Insert (one with parent)', async () => {
    const parent: Category | undefined = (await fetchCategories()).result?.[0];

    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const category: Category = { ...SampleCategory02, parent: parent?.id };

      const response = await upsertCategory(category);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Category>> = {
        result: [SampleCategory01, { ...SampleCategory02, parent }],
        error: null,
      };

      const response = await fetchCategories();

      expect(response) //
        .excludingEvery(['id'])
        .to.deep.equal(sampleResponse);
    }
  });
});
