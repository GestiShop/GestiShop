import { EMPTY_EFACT, Provider } from '../../../src/model';

export const SampleProvider00: Provider = {
  reference: 'PROV00',
  contactData: {
    name: 'Provider 00 contact name',
    email: undefined,
    phone: undefined,
  },
  fiscalData: {
    name: 'Provider 00 fiscal name',
    nif: '00000000A',
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
  },
  postalData: {
    name: 'Provider 00 postal name',
    address: undefined,
    email: undefined,
  },
  tributationData: {
    retentionPercentage: 0,
    personalDiscount: 0,
  },
  eFactData: EMPTY_EFACT,
  bills: [],
};

export const SampleProvider01: Provider = {
  reference: 'PROV01',
  contactData: {
    name: 'Provider 01 contact name',
    email: undefined,
    phone: undefined,
  },
  fiscalData: {
    name: 'Provider 01 fiscal name',
    nif: '11111111B',
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
  },
  postalData: {
    name: 'Provider 01 postal name',
    address: undefined,
    email: undefined,
  },
  tributationData: {
    retentionPercentage: 0,
    personalDiscount: 0,
  },
  eFactData: EMPTY_EFACT,
  bills: [],
};
