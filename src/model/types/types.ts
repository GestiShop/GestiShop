import { Types } from 'mongoose';

export type DBHelperResponse<T> = {
  error: {
    code: number;
    message: string;
  } | null;
  result: T | null;
};

/* ----- ----- AUXILIAR TYPES ----- ----- */
export type Phone = {
  phone: string;
  description?: string;
};

export type Email = {
  email: string;
  description?: string;
};

export type Address = {
  roadType: string;
  street: string;
  number: string;
  floor?: string;
  door?: string;
  extra?: string;
  zipCode: string;
  city: string;
  province: string;
  state?: string;
  country: string;
};

export type ProductInBill = {
  product?: Types.ObjectId;
  reference: string;
  name: string;
  basePricePerUnit: number;
  unitType: string;
  discountPercentage: number;
  taxPercentage: number;
  quantity: number;
};

export type FiscalData = {
  name: string;
  nif: string;
  address: Address;
};

export type ContactData = {
  name: string;
  phone?: Phone;
  email?: Email;
};

export type PostalData = {
  name: string;
  email?: Email;
  address?: Address;
};

export type EFact = {
  accountingOfficeCode: string;
  accountingOfficeName: string;
  managementBodyCode: string;
  managementBodyName: string;
  processingUnitCode: string;
  processingUnitName: string;
  electronicBillingCode: string;
};

/* ----- ----- CALENDAR EVENT ----- ----- */
export type CalendarEvent = {
  id?: Types.ObjectId;
  start: Date;
  end: Date;
  title: string;
  description?: string;
  allDay?: boolean;
  colorCode?: PlatformEventColorCode;
};

/* ----- ----- BILL ----- ----- */
export type Bill = {
  id?: Types.ObjectId;
  billNumberPreamble: string;
  billNumber: number;
  date: Date;
  entityData: {
    entity: Types.ObjectId;
    fiscalData: FiscalData;
  };
  products: Array<ProductInBill>;
  notes?: string;
  basePrice: number;
  generalDiscount: number;
  pvp: number;
  paymentData: {
    method: string;
    expirationDate: Date;
  };
  isPaid: boolean;
};

/* ----- ----- BUDGET ----- ----- */
export type Budget = {
  id?: Types.ObjectId;
  budgetNumberPreamble: string;
  budgetNumber: number;
  date: Date;
  expirationDate: Date;
  entityData: {
    entity: Types.ObjectId;
    fiscalData: FiscalData;
  };
  products: Array<ProductInBill>;
  notes?: string;
  basePrice: number;
  generalDiscount: number;
  pvp: number;
  associatedBill?: Types.ObjectId;
};

/* ----- ----- DELIVERY NOTE ----- ----- */
export type DeliveryNote = {
  id?: Types.ObjectId;
  deliveryNoteNumberPreamble: string;
  deliveryNoteNumber: number;
  date: Date;
  entityData: {
    entity: Types.ObjectId;
    fiscalData: FiscalData;
  };
  products: Array<ProductInBill>;
  notes?: string;
  basePrice: number;
  generalDiscount: number;
  pvp: number;
  associatedBill?: Types.ObjectId;
};

/* ----- ----- CATEGORY ----- ----- */
export type Category = {
  id?: Types.ObjectId;
  reference: string;
  name: string;
  parent?: Category | Types.ObjectId;
};

/* ----- ----- CLIENT ----- ----- */
export type Client = {
  id?: Types.ObjectId;
  reference: string;
  contactData: ContactData;
  fiscalData: FiscalData;
  postalData: PostalData;
  tributationData: {
    retentionPercentage: number;
    personalDiscount: number;
  };
  eFactData: EFact;
  bills: Array<Types.ObjectId>;
};

export type FullClient = {
  id?: Types.ObjectId;
  reference: string;
  contactData: ContactData;
  fiscalData: FiscalData;
  postalData: PostalData;
  tributationData: {
    retentionPercentage: number;
    personalDiscount: number;
  };
  eFactData: EFact;
  bills: Array<Bill>;
};

/* ----- ----- PROVIDER ----- ----- */
export type Provider = {
  id?: Types.ObjectId;
  reference: string;
  contactData: ContactData;
  fiscalData: FiscalData;
  postalData: PostalData;
  tributationData: {
    retentionPercentage: number;
    personalDiscount: number;
  };
  eFactData: EFact;
  bills: Array<Types.ObjectId>;
};

export type FullProvider = {
  id?: Types.ObjectId;
  reference: string;
  contactData: ContactData;
  fiscalData: FiscalData;
  postalData: PostalData;
  tributationData: {
    retentionPercentage: number;
    personalDiscount: number;
  };
  eFactData: EFact;
  bills: Array<Bill>;
};

/* ----- ----- PRODUCT ----- ----- */
export type Product = {
  id?: Types.ObjectId;
  reference: string;
  name: string;
  description?: string;
  buyingInfo: {
    basePrice: number;
    discountPercentage: number;
    taxPercentage: Types.ObjectId | null;
  };
  sellingInfo: {
    basePrice: number;
    discountPercentage: number;
    taxPercentage: Types.ObjectId | null;
  };
  unitType: Types.ObjectId | null;
  stock: number;
  warehouse: Types.ObjectId | null;
  categories?: Array<Types.ObjectId>;
  minStock?: number;
  stockAlert: boolean;
};

export type FullProduct = {
  id?: Types.ObjectId;
  reference: string;
  name: string;
  description?: string;
  buyingInfo: {
    basePrice: number;
    discountPercentage: number;
    taxPercentage: Tax;
  };
  sellingInfo: {
    basePrice: number;
    discountPercentage: number;
    taxPercentage: Tax;
  };
  unitType: UnitType;
  stock: number;
  warehouse: Warehouse;
  categories?: Array<Category>;
  minStock?: number;
  stockAlert: boolean;
};

/* ----- ----- TAX ----- ----- */
export type Tax = {
  id?: Types.ObjectId;
  reference: string;
  percentage: number;
};

/* ----- ----- UNIT TYPE ----- ----- */
export type UnitType = {
  id?: Types.ObjectId;
  reference: string;
  unit: string;
};

/* ----- ----- WAREHOUSE ----- ----- */
export type Warehouse = {
  id?: Types.ObjectId;
  reference: string;
  description: string;
  address: Address;
};

/* ----- ----- PLATFORM PARAMETERS ----- ----- */
export const LANGUAGE_LIST = ['en', 'es', 'ca'] as const;
export const CURRENCY_LIST = ['eur', 'usd'] as const;
export const DECIMAL_MODES = ['trunk', 'round-up', 'round-down'] as const;
export const FLOATING_POSITION_OPTIONS = [0, 1, 2, 3, 4, 5, 6] as const;
export const EVENT_COLOR_LIST = [
  {
    background: 'lightseagreen',
    text: 'white',
  },
  {
    background: 'lightblue',
    text: 'darkslategray',
  },
  {
    background: 'lightcoral',
    text: 'darkslategray',
  },
  {
    background: 'lightgoldenrodyellow',
    text: 'darkslategray',
  },
  {
    background: 'lightcyan',
    text: 'darkslategray',
  },
  {
    background: 'lightpink',
    text: 'darkslategray',
  },
  {
    background: 'lightgreen',
    text: 'darkslategray',
  },
  {
    background: 'lightsalmon',
    text: 'darkslategray',
  },
  {
    background: 'lightgray',
    text: 'darkslategray',
  },
] as const;

// Language info:
export type PlatformLanguageCode = typeof LANGUAGE_LIST[number];

export type PlatformLanguageInfo = {
  languageCode: PlatformLanguageCode;
};

// Currency info:
export type PlatformCurrencyCode = typeof CURRENCY_LIST[number];
export type PlatformDecimalModeCode = typeof DECIMAL_MODES[number];
export type PlatformFloatingPositionOption =
  typeof FLOATING_POSITION_OPTIONS[number];

export type PlatformCurrencyInfo = {
  currencyCode: PlatformCurrencyCode;
  decimalModeCode: PlatformDecimalModeCode;
  floatingPositions: PlatformFloatingPositionOption;
};

// Database info:
export type PlatformDatabaseInfo = {
  url: string;
  port: string;
  name: string;
  user: string;
  password: string;
  isRemote: boolean;
};

// Business info:
export type PlatformBusinessInfo = {
  name: string;
  nif: string;
  address: Address;
};

// Event colors:
export type PlatformEventColorCode = typeof EVENT_COLOR_LIST[number];
