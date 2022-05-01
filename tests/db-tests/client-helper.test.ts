/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import sinon from 'sinon';
import * as time from './utils/time';
import { fetchClientById, fetchClients, upsertClient } from '../../src/db';
import {
  clearDatabase,
  closeDatabase,
  connectDatabase,
} from './utils/database-config';
import { Client, DBHelperResponse } from '../../src/model';
import { SampleClient00, SampleClient01 } from './samples';
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

describe('Client helper', () => {
  it('Fetch all (empty)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Client>> = {
      result: [],
      error: null,
    };
    const response = await fetchClients();

    expect(response).toEqual(sampleResponse);
  });

  it('Insert (one)', async () => {
    expect.assertions(2);
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertClient(SampleClient00);

      expect(response).toEqual(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Client>> = {
        result: [SampleClient00],
        error: null,
      };

      const response = await fetchClients();

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

      const client: Client = SampleClient01;
      client.id = (await fetchClients()).result?.[0]?.id;

      const response = await upsertClient(client);

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Client>> = {
        result: [SampleClient01],
        error: null,
      };

      const response = await fetchClients();

      expect(_.isMatch(response, sampleResponse)).toEqual(true);
    }
  });

  it('Fetch all (with results)', async () => {
    expect.assertions(1);

    const sampleResponse: DBHelperResponse<Array<Client>> = {
      result: [SampleClient01],
      error: null,
    };
    const response = await fetchClients();

    expect(_.isMatch(response, sampleResponse)).toEqual(true);
  });

  it('Fetch by id', async () => {
    expect.assertions(1);

    const client: Client = SampleClient01;
    client.id = (await fetchClients()).result?.[0]?.id;

    const sampleResponse: DBHelperResponse<Client> = {
      result: client,
      error: null,
    };

    const response =
      client.id !== undefined ? await fetchClientById(client.id) : undefined;

    expect(
      response === undefined //
        ? false
        : _.isMatch(response, sampleResponse)
    ).toEqual(true);
  });
});
