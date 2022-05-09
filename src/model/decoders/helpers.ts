import {
  Address,
  CalendarEvent,
  Category,
  Client,
  ContactData,
  EFactData,
  FiscalData,
  FullProduct,
  PostalData,
  Product,
  Provider,
  Tax,
  TributationData,
  UnitType,
  Warehouse,
} from '../types';
import {
  addressDecoder,
  contactDataDecoder,
  eFactDataDecoder,
  fiscalDataDecoder,
  postalDataDecoder,
  taxDecoder,
  tributationDataDecoder,
  unitTypeDecoder,
  warehouseDecoder,
} from './decoders';

export const decodeAddress = (address: any): Address => {
  return addressDecoder.forceDecode(address);
};

export const decodeCalendarEvent = (dbEvent: any): CalendarEvent => {
  return {
    id: dbEvent._id,
    start: dbEvent.start,
    end: dbEvent.end,
    title: dbEvent.title,
    description: dbEvent.description,
    allDay: dbEvent.allDay,
    colorCode: dbEvent.colorCode ?? undefined,
  };
};

export const decodeTax = (tax: any): Tax => {
  return taxDecoder.forceDecode(tax);
};

export const decodeUnitType = (unitType: any): UnitType => {
  return unitTypeDecoder.forceDecode(unitType);
};

export const decodeWarehouse = (warehouse: any): Warehouse => {
  return warehouseDecoder.forceDecode(warehouse);
};

export const decodeCategory = (dbCategory: any): Category => {
  return {
    id: dbCategory._id,
    reference: dbCategory.reference,
    name: dbCategory.name,
    parent:
      dbCategory.parent != null //
        ? decodeCategory(dbCategory.parent)
        : undefined,
  };
};

export const decodeProduct = (dbProduct: any): Product => {
  return {
    id: dbProduct._id,
    reference: dbProduct.reference,
    name: dbProduct.name,
    description: dbProduct.description,
    buyingInfo: {
      basePrice: dbProduct.buyingInfo.basePrice,
      discountPercentage: dbProduct.buyingInfo.discountPercentage,
      taxPercentage: dbProduct.buyingInfo.taxPercentage,
    },
    sellingInfo: {
      basePrice: dbProduct.sellingInfo.basePrice,
      discountPercentage: dbProduct.sellingInfo.discountPercentage,
      taxPercentage: dbProduct.sellingInfo.taxPercentage,
    },
    unitType: dbProduct.unitType,
    stock: dbProduct.stock,
    warehouse: dbProduct.warehouse,
    categories: dbProduct.categories,
    minStock: dbProduct.minStock,
    stockAlert: dbProduct.stockAlert,
  };
};

export const decodeFullProduct = (dbProduct: any): FullProduct => {
  return {
    id: dbProduct._id,
    reference: dbProduct.reference,
    name: dbProduct.name,
    description: dbProduct.description,
    buyingInfo: {
      basePrice: dbProduct.buyingInfo.basePrice,
      discountPercentage: dbProduct.buyingInfo.discountPercentage,
      taxPercentage: decodeTax(dbProduct.buyingInfo.taxPercentage),
    },
    sellingInfo: {
      basePrice: dbProduct.sellingInfo.basePrice,
      discountPercentage: dbProduct.sellingInfo.discountPercentage,
      taxPercentage: decodeTax(dbProduct.sellingInfo.taxPercentage),
    },
    unitType: decodeUnitType(dbProduct.unitType),
    stock: dbProduct.stock,
    warehouse: decodeWarehouse(dbProduct.warehouse),
    categories: dbProduct.categories.map(decodeCategory),
    minStock: dbProduct.minStock,
    stockAlert: dbProduct.stockAlert,
  };
};

const decodeContactData = (contactData: any): ContactData => {
  return contactDataDecoder.forceDecode(contactData);
};

const decodeFiscalData = (fiscalData: any): FiscalData => {
  return fiscalDataDecoder.forceDecode(fiscalData);
};

const decodePostalData = (postalData: any): PostalData => {
  return postalDataDecoder.forceDecode(postalData);
};

const decodeTributationData = (tributationData: any): TributationData => {
  return tributationDataDecoder.forceDecode(tributationData);
};

const decodeEFactData = (eFactData: any): EFactData => {
  return eFactDataDecoder.forceDecode(eFactData);
};

export const decodeClient = (dbClient: any): Client => {
  return {
    id: dbClient._id,
    reference: dbClient.reference,
    contactData: decodeContactData(dbClient.contactData),
    fiscalData: decodeFiscalData(dbClient.fiscalData),
    postalData: decodePostalData(dbClient.postalData),
    tributationData: decodeTributationData(dbClient.tributationData),
    eFactData: decodeEFactData(dbClient.eFactData),
    bills: dbClient.bills,
  };
};

export const decodeProvider = (dbProvider: any): Provider => {
  return {
    id: dbProvider._id,
    reference: dbProvider.reference,
    contactData: decodeContactData(dbProvider.contactData),
    fiscalData: decodeFiscalData(dbProvider.fiscalData),
    postalData: decodePostalData(dbProvider.postalData),
    tributationData: decodeTributationData(dbProvider.tributationData),
    eFactData: decodeEFactData(dbProvider.eFactData),
    bills: dbProvider.bills,
  };
};
