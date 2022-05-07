import { Warehouse } from '../../../src/model';

export const SampleWarehouse00: Warehouse = {
  reference: 'WAREHOUSE00',
  description: 'Warehouse 00 description',
  address: {
    roadType: 'Street',
    street: 'Street Name',
    number: '0',
    zipCode: '00000',
    city: 'City name',
    province: 'Province name',
    country: 'Country name',
    door: undefined,
    extra: undefined,
    floor: undefined,
    state: undefined,
  },
};

export const SampleWarehouse01: Warehouse = {
  reference: 'WAREHOUSE01',
  description: 'Warehouse 01 description',
  address: {
    roadType: 'Street',
    street: 'Street Name',
    number: '1',
    zipCode: '11111',
    city: 'City name',
    province: 'Province name',
    country: 'Country name',
    door: undefined,
    extra: undefined,
    floor: undefined,
    state: undefined,
  },
};
