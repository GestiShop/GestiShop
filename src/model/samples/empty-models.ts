import {
  Address,
  Category,
  EFact,
  Email,
  Phone,
  ProductInBill,
  Tax,
  UnitType,
  Warehouse,
} from '../types';

/* ----- ----- AUXILIAR TYPES ----- ----- */
export const EMPTY_EMAIL: Email = {
  description: '',
  email: '',
};

export const EMPTY_PHONE: Phone = {
  description: '',
  phone: '',
};

export const EMPTY_ADDRESS: Address = {
  roadType: '',
  street: '',
  number: '',
  floor: '',
  door: '',
  extra: '',
  zipCode: '',
  city: '',
  province: '',
  state: '',
  country: '',
};

export const EMPTY_PRODUCT_IN_BILL: ProductInBill = {
  reference: '',
  name: '',
  basePricePerUnit: 0,
  unitType: '',
  discountPercentage: 0,
  taxPercentage: 0,
  quantity: 0,
};

export const EMPTY_PRODUCT_IN_BUDGET: ProductInBill = EMPTY_PRODUCT_IN_BILL;

export const EMPTY_PRODUCT_IN_DELIVERY_NOTE: ProductInBill =
  EMPTY_PRODUCT_IN_BILL;

export const EMPTY_EFACT: EFact = {
  accountingOfficeCode: '',
  accountingOfficeName: '',
  managementBodyCode: '',
  managementBodyName: '',
  processingUnitCode: '',
  processingUnitName: '',
  electronicBillingCode: '',
};

/* ----- ----- TAX ----- ----- */
export const EMPTY_TAX: Tax = {
  reference: '',
  percentage: 0,
};

/* ----- ----- UNIT TYPE ----- ----- */
export const EMPTY_UNIT_TYPE: UnitType = {
  reference: '',
  unit: '',
};

/* ----- ----- WAREHOUSE ----- ----- */
export const EMPTY_WAREHOUSE: Warehouse = {
  reference: '',
  description: '',
  address: EMPTY_ADDRESS,
};

/* ----- ----- CATEGORY ----- ----- */
export const EMPTY_CATEGORY: Category = {
  reference: '',
  name: '',
};
