/**
 * @jest-environment node
 */

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

describe('Client helper', () => {
  it('Fetch all (empty)', async () => {
    const sampleResponse: DBHelperResponse<Array<Client>> = {
      result: [],
      error: null,
    };
    const response = await fetchClients();

    expect(response) //
      .to.deep.equal(sampleResponse);
  });

  it('Insert (one)', async () => {
    {
      const sampleResponse: DBHelperResponse<boolean> = {
        result: true,
        error: null,
      };

      const response = await upsertClient(SampleClient00);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Client>> = {
        result: [SampleClient00],
        error: null,
      };

      const response = await fetchClients();

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

      const client: Client = SampleClient01;
      client.id = (await fetchClients()).result?.[0]?.id;

      const response = await upsertClient(client);

      expect(response) //
        .to.deep.equal(sampleResponse);
    }
    {
      const sampleResponse: DBHelperResponse<Array<Client>> = {
        result: [SampleClient01],
        error: null,
      };

      const response = await fetchClients();

      expect(response) //
        .excludingEvery(['id'])
        .to.deep.equal(sampleResponse);
    }
  });

  it('Fetch all (with results)', async () => {
    const sampleResponse: DBHelperResponse<Array<Client>> = {
      result: [SampleClient01],
      error: null,
    };
    const response = await fetchClients();

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });

  it('Fetch by id', async () => {
    const client: Client = SampleClient01;
    client.id = (await fetchClients()).result?.[0]?.id;

    const sampleResponse: DBHelperResponse<Client> = {
      result: client,
      error: null,
    };

    const response =
      client.id !== undefined ? await fetchClientById(client.id) : undefined;

    expect(response) //
      .excludingEvery(['id'])
      .to.deep.equal(sampleResponse);
  });
});
