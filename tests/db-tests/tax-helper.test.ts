/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import sinon from 'sinon';
import * as time from './time';
import { fetchTaxes } from '../../src/db';
import {
  connectDatabase,
  clearDatabase,
  closeDatabase,
} from './database-config';

sinon.stub(time, 'setTimeout');
jest.setTimeout(35000);

beforeAll(async () => {
  await connectDatabase();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Tax helper', () => {
  it('Fetch', async () => {
    expect.assertions(1);

    const sampleResponse = {
      result: [],
      error: null,
    };
    const response = await fetchTaxes();

    expect(response).toEqual(sampleResponse);
  });
});
