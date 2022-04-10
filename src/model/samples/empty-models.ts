import {
  Address,
  Category,
  Client,
  CURRENCY_LIST,
  DECIMAL_MODES,
  EFact,
  Email,
  EVENT_COLOR_LIST,
  FLOATING_POSITION_OPTIONS,
  LANGUAGE_LIST,
  Phone,
  PlatformBusinessInfo,
  PlatformCurrencyCode,
  PlatformCurrencyInfo,
  PlatformDatabaseInfo,
  PlatformDecimalModeCode,
  PlatformEventColorCode,
  PlatformFloatingPositionOption,
  PlatformLanguageCode,
  PlatformLanguageInfo,
  ProductInBill,
  Provider,
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

/* ----- ----- CLIENT ----- ----- */
export const EMPTY_CLIENT: Client = {
  reference: '',
  contactData: {
    name: '',
  },
  fiscalData: {
    name: '',
    nif: '',
    address: EMPTY_ADDRESS,
  },
  postalData: {
    name: '',
  },
  tributationData: {
    retentionPercentage: 0,
    personalDiscount: 0,
  },
  eFactData: EMPTY_EFACT,
  bills: [],
};

/* ----- ----- PROVIDER ----- ----- */
export const EMPTY_PROVIDER: Provider = {
  reference: '',
  contactData: {
    name: '',
  },
  fiscalData: {
    name: '',
    nif: '',
    address: EMPTY_ADDRESS,
  },
  postalData: {
    name: '',
  },
  tributationData: {
    retentionPercentage: 0,
    personalDiscount: 0,
  },
  eFactData: EMPTY_EFACT,
  bills: [],
};

/* ----- ----- PLATFORM PARAMETERS ----- ----- */
// Language info:
export const DEFAULT_LANGUAGE_CODE: PlatformLanguageCode = LANGUAGE_LIST[0];

export const DEFAULT_LANGUAGE_INFO: PlatformLanguageInfo = {
  languageCode: DEFAULT_LANGUAGE_CODE,
};

// Currency info:
export const DEFAULT_CURRENCY_CODE: PlatformCurrencyCode = CURRENCY_LIST[0];
export const DEFAULT_DECIMAL_MODE_CODE: PlatformDecimalModeCode =
  DECIMAL_MODES[0];
export const DEFAULT_FLOATING_POSITION_OPTION_CODE: PlatformFloatingPositionOption =
  FLOATING_POSITION_OPTIONS[0];

export const DEFAULT_CURRENCY_INFO: PlatformCurrencyInfo = {
  currencyCode: DEFAULT_CURRENCY_CODE,
  decimalModeCode: DEFAULT_DECIMAL_MODE_CODE,
  floatingPositions: DEFAULT_FLOATING_POSITION_OPTION_CODE,
};

// Database info:
export const DEFAULT_DATABASE_INFO: PlatformDatabaseInfo = {
  url: 'localhost',
  port: '27017',
  name: 'gestishop',
  user: 'root',
  password: '',
  isRemote: false,
};

// Business info:
export const DEFAULT_BUSINESS_INFO: PlatformBusinessInfo = {
  name: '',
  nif: '',
  address: EMPTY_ADDRESS,
};

// Event colors:
export const DEFAULT_EVENT_COLOR_CODE: PlatformEventColorCode =
  EVENT_COLOR_LIST[0];
