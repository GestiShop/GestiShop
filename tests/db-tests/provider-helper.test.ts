/**
 * @jest-environment node
 */

import sinon from 'sinon';
import * as time from './utils/time';
import {
  fetchProviderById,
  fetchProviders,
  upsertProvider,
} from '../../src/db';
import {
  clearDatabase,
  closeDatabase,
  connectDatabase,
} from './utils/database-config';
import { DBHelperResponse, Provider } from '../../src/model';
import { SampleProvider00, SampleProvider01 } from './samples';
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

describe('Provider helper', () => {
  it('Fetch all (empty)', async () => {
    const sampleResponse: DBHelperResponse<Array<Provider>> = {
      result: [],
      error: null,
    };
    const response = await fetchProviders();

    expect(response) //
      .to.deep.equal(sampleResponse);
  });

  it('Insert (one)', async () => {
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertProvider(SampleProvider00);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Provider>> = {
        result: [SampleProvider00],
        error: null,
      };

      const response = await fetchProviders();

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

      const provider: Provider = SampleProvider01;
      provider.id = (await fetchProviders()).result?.[0]?.id;

      const response = await upsertProvider(provider);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Provider>> = {
        result: [SampleProvider01],
        error: null,
      };

      const response = await fetchProviders();

      expect(response) //
        .excludingEvery(['id'])
        .to.deep.equal(sampleResponse);
    }
  });

  it('Fetch all (with results)', async () => {
    const sampleResponse: DBHelperResponse<Array<Provider>> = {
      result: [SampleProvider01],
      error: null,
    };
    const response = await fetchProviders();

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });

  it('Fetch by id', async () => {
    const provider: Provider = SampleProvider01;
    provider.id = (await fetchProviders()).result?.[0]?.id;

    const sampleResponse: DBHelperResponse<Provider> = {
      result: provider,
      error: null,
    };

    const response =
      provider.id !== undefined
        ? await fetchProviderById(provider.id)
        : undefined;

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });
});
