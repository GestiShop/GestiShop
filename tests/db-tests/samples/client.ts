import { Client, EMPTY_EFACT } from '../../../src/model';

export const SampleClient00: Client = {
  reference: 'CLI00',
  contactData: {
    name: 'Client 00 contact name',
  },
  fiscalData: {
    name: 'Client 00 fiscal name',
    nif: '00000000A',
    address: {
      roadType: 'Street',
      street: 'Street Name',
      number: '0',
      zipCode: '00000',
      city: 'City name',
      province: 'Province name',
      country: 'Country name',
    },
  },
  postalData: {
    name: 'Client 00 postal name',
  },
  tributationData: {
    retentionPercentage: 0,
    personalDiscount: 0,
  },
  eFactData: EMPTY_EFACT,
  bills: [],
};

export const SampleClient01: Client = {
  reference: 'PROV01',
  contactData: {
    name: 'Client 01 contact name',
  },
  fiscalData: {
    name: 'Client 01 fiscal name',
    nif: '11111111B',
    address: {
      roadType: 'Street',
      street: 'Street Name',
      number: '1',
      zipCode: '11111',
      city: 'City name',
      province: 'Province name',
      country: 'Country name',
    },
  },
  postalData: {
    name: 'Client 01 postal name',
  },
  tributationData: {
    retentionPercentage: 0,
    personalDiscount: 0,
  },
  eFactData: EMPTY_EFACT,
  bills: [],
};
