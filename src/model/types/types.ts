import * as D from 'schemawax';
import { Types } from 'mongoose';
import {
  addressDecoder,
  contactDataDecoder,
  eFactDataDecoder,
  emailDecoder,
  fiscalDataDecoder,
  phoneDecoder,
  postalDataDecoder,
  taxDecoder,
  tributationDataDecoder,
  unitTypeDecoder,
  warehouseDecoder,
} from '..';

export type DBHelperResponse<T> = {
  error: {
    code: number;
    message: string;
  } | null;
  result: T | null;
};

/* ----- ----- AUXILIAR TYPES ----- ----- */
export type Phone = D.Output<typeof phoneDecoder>;
export type Email = D.Output<typeof emailDecoder>;
export type Address = D.Output<typeof addressDecoder>;
export type FiscalData = D.Output<typeof fiscalDataDecoder>;
export type ContactData = D.Output<typeof contactDataDecoder>;
export type PostalData = D.Output<typeof postalDataDecoder>;
export type TributationData = D.Output<typeof tributationDataDecoder>;
export type EFactData = D.Output<typeof eFactDataDecoder>;

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
// TODO: SPLIT INTO CATEGORY AND FULLCATEGORY
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
  tributationData: TributationData;
  eFactData: EFactData;
  bills: Array<Types.ObjectId>;
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
  eFactData: EFactData;
  bills: Array<Types.ObjectId>;
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
  categories: Array<Types.ObjectId>;
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
export type Tax = D.Output<typeof taxDecoder>;

/* ----- ----- UNIT TYPE ----- ----- */
export type UnitType = D.Output<typeof unitTypeDecoder>;

/* ----- ----- WAREHOUSE ----- ----- */
export type Warehouse = D.Output<typeof warehouseDecoder>;

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
