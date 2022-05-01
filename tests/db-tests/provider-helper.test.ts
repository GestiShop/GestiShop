/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import sinon from 'sinon';
import * as time from './utils/time';
import {
  fetchProviderById,
  fetchProviders,
  upsertProvider,
} from '../../src/db';
import { closeDatabase, connectDatabase } from './utils/database-config';
import { DBHelperResponse, Provider } from '../../src/model';
import { SampleProvider00, SampleProvider01 } from './samples';
import * as _ from 'lodash';

sinon.stub(time, 'setTimeout');
jest.setTimeout(35000);

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Provider helper', () => {
  it('Fetch all (empty)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Provider>> = {
      result: [],
      error: null,
    };
    const response = await fetchProviders();

    expect(response).toEqual(sampleResponse);
  });

  it('Insert (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertProvider(SampleProvider00);

      expect(response).toEqual(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Provider>> = {
        result: [SampleProvider00],
        error: null,
      };

      const response = await fetchProviders();

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

      const provider: Provider = SampleProvider01;
      provider.id = (await fetchProviders()).result?.[0]?.id;

      const response = await upsertProvider(provider);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Provider>> = {
        result: [SampleProvider01],
        error: null,
      };

      const response = await fetchProviders();

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
  });

  it('Fetch all (with results)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Provider>> = {
      result: [SampleProvider01],
      error: null,
    };
    const response = await fetchProviders();

    expect(_.isMatch(response, sampleResponse)).toEqual(true);
  });

  it('Fetch by id', async () => {
    expect.assertions(1);

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

    expect(
      response === undefined //
        ? false
        : _.isMatch(response, sampleResponse)
    ).toEqual(true);
  });
});
