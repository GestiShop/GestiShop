import { Product, FullProduct } from '../../../src/model';
import { SampleTax00 } from './tax';
import { SampleUnitType00 } from './unit-type';
import { SampleWarehouse00 } from './warehouse';
import { SampleCategory00 } from './category';

export const SampleProduct00: Product = {
  reference: 'PROD00',
  name: 'Sample product 00',
  description: 'Sample description 00',
  buyingInfo: {
    basePrice: 1.0,
    discountPercentage: 0.0,
    taxPercentage: null,
  },
  sellingInfo: {
    basePrice: 1.5,
    discountPercentage: 0.0,
    taxPercentage: null,
  },
  unitType: null,
  stock: 100,
  warehouse: null,
  stockAlert: false,
  minStock: 10,
  categories: [],
};

export const SampleProduct01: Product = {
  reference: 'PROD01',
  name: 'Sample product 01',
  description: 'Sample description 01',
  buyingInfo: {
    basePrice: 111.0,
    discountPercentage: 10.0,
    taxPercentage: null,
  },
  sellingInfo: {
    basePrice: 111.15,
    discountPercentage: 0.01,
    taxPercentage: null,
  },
  unitType: null,
  stock: 115,
  warehouse: null,
  stockAlert: false,
  minStock: 100,
  categories: [],
};

export const SampleFullProduct00: FullProduct = {
  reference: 'PROD00',
  name: 'Sample product 00',
  description: 'Sample description 00',
  buyingInfo: {
    basePrice: 1.0,
    discountPercentage: 0.0,
    taxPercentage: SampleTax00,
  },
  sellingInfo: {
    basePrice: 1.5,
    discountPercentage: 0.0,
    taxPercentage: SampleTax00,
  },
  unitType: SampleUnitType00,
  stock: 100,
  warehouse: SampleWarehouse00,
  stockAlert: false,
  minStock: 10,
  categories: [SampleCategory00],
};

export const SampleFullProduct01: FullProduct = {
  reference: 'PROD01',
  name: 'Sample product 01',
  description: 'Sample description 01',
  buyingInfo: {
    basePrice: 111.0,
    discountPercentage: 10.0,
    taxPercentage: SampleTax00,
  },
  sellingInfo: {
    basePrice: 111.15,
    discountPercentage: 0.01,
    taxPercentage: SampleTax00,
  },
  unitType: SampleUnitType00,
  stock: 115,
  warehouse: SampleWarehouse00,
  stockAlert: false,
  minStock: 100,
  categories: [SampleCategory00],
};
