/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
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

describe('Category helper', () => {
  it('Fetch all (empty)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Category>> = {
      result: [],
      error: null,
    };
    const response = await fetchCategories();

    expect(response).toEqual(sampleResponse);
  });

  it('Insert (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertCategory(SampleCategory00);

      expect(response).toEqual(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Category>> = {
        result: [SampleCategory00],
        error: null,
      };

      const response = await fetchCategories();

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

      const category: Category = SampleCategory01;
      category.id = (await fetchCategories()).result?.[0]?.id;

      const response = await upsertCategory(category);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Category>> = {
        result: [SampleCategory01],
        error: null,
      };

      const response = await fetchCategories();

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
  });

  it('Fetch all (with results)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Category>> = {
      result: [SampleCategory01],
      error: null,
    };
    const response = await fetchCategories();

    expect(_.isMatch(response, sampleResponse)).toEqual(true);
  });

  it('Fetch by id', async () => {
    expect.assertions(1);

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

    expect(
      response === undefined //
        ? false
        : _.isMatch(response, sampleResponse)
    ).toEqual(true);
  });

  it('Insert (one with parent)', async () => {
    expect.assertions(2);
    const parent: Category | undefined = (await fetchCategories()).result?.[0];

    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const category: Category = { ...SampleCategory02, parent: parent?.id };

      const response = await upsertCategory(category);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Category>> = {
        result: [SampleCategory01, { ...SampleCategory02, parent }],
        error: null,
      };

      const response = await fetchCategories();

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
  });
});
