/* eslint-disable no-underscore-dangle */
import {
  Address,
  Bill,
  CalendarEvent,
  Category,
  Client,
  ContactData,
  EFactData,
  Email,
  FiscalData,
  FullClient,
  FullProduct,
  FullProvider,
  Phone,
  PostalData,
  Product,
  ProductInBill,
  Provider,
  Tax,
  TributationData,
  UnitType,
  Warehouse,
} from '../types';

export const decodeAddress = (data: any): Address => {
  return {
    roadType: data.roadType,
    street: data.street,
    number: data.number,
    floor: data.floor,
    door: data.door,
    extra: data.extra,
    zipCode: data.zipCode,
    city: data.city,
    province: data.province,
    state: data.state,
    country: data.country,
  };
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

export const decodeTax = (dbTax: any): Tax => {
  return {
    id: dbTax._id,
    reference: dbTax.reference,
    percentage: dbTax.percentage,
  };
};

export const decodeUnitType = (dbUnitType: any): UnitType => {
  return {
    id: dbUnitType._id,
    reference: dbUnitType.reference,
    unit: dbUnitType.unit,
  };
};

export const decodeWarehouse = (dbWarehouse: any): Warehouse => {
  return {
    id: dbWarehouse._id,
    reference: dbWarehouse.reference,
    description: dbWarehouse.description,
    address: decodeAddress(dbWarehouse.address),
  };
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
    categories: dbProduct.categories.map((category: any) =>
      decodeCategory(category)
    ),
    minStock: dbProduct.minStock,
    stockAlert: dbProduct.stockAlert,
  };
};

const decodeProductInBill = (dbProduct: any): ProductInBill => {
  return {
    product: dbProduct.product,
    reference: dbProduct.reference,
    name: dbProduct.name,
    basePricePerUnit: dbProduct.basePricePerUnit,
    unitType: dbProduct.unitType,
    discountPercentage: dbProduct.discountPercentage,
    taxPercentage: dbProduct.taxPercentage,
    quantity: dbProduct.quantity,
  };
};

export const decodeBill = (dbBill: any): Bill => {
  return {
    id: dbBill._id,
    billNumberPreamble: dbBill.billNumberPreamble,
    billNumber: dbBill.billNumber,
    date: dbBill.date,
    entityData: dbBill.entityData,
    products: dbBill.products.map(decodeProductInBill),
    notes: dbBill.notes,
    basePrice: dbBill.basePrice,
    generalDiscount: dbBill.generalDiscount,
    pvp: dbBill.pvp,
    paymentData: dbBill.paymentData,
    isPaid: dbBill.isPaid,
  };
};

const decodePhone = (phoneData: any): Phone => {
  return {
    phone: phoneData.phone,
    description: phoneData.description,
  };
};

const decodeEmail = (emailData: any): Email => {
  return {
    email: emailData.email,
    description: emailData.description,
  };
};

const decodeContactData = (contactData: any): ContactData => {
  return {
    name: contactData.name,
    phone:
      contactData?.phone != null //
        ? decodePhone(contactData.phone)
        : undefined,
    email:
      contactData?.email != null //
        ? decodeEmail(contactData.email)
        : undefined,
  };
};

const decodeFiscalData = (fiscalData: any): FiscalData => {
  return {
    name: fiscalData.name,
    nif: fiscalData.nif,
    address: decodeAddress(fiscalData.address),
  };
};

const decodePostalData = (postalData: any): PostalData => {
  return {
    name: postalData.name,
    email:
      postalData?.email != null //
        ? decodeEmail(postalData.email)
        : undefined,
    address:
      postalData?.address != null //
        ? decodeAddress(postalData.address)
        : undefined,
  };
};

const decodeTributationData = (tributationData: any): TributationData => {
  return {
    retentionPercentage: tributationData.retentionPercentage,
    personalDiscount: tributationData.personalDiscount,
  };
};

const decodeEFactData = (eFactData: any): EFactData => {
  return {
    accountingOfficeCode: eFactData.accountingOfficeCode,
    accountingOfficeName: eFactData.accountingOfficeName,
    managementBodyCode: eFactData.managementBodyCode,
    managementBodyName: eFactData.managementBodyName,
    processingUnitCode: eFactData.processingUnitCode,
    processingUnitName: eFactData.processingUnitName,
    electronicBillingCode: eFactData.electronicBillingCode,
  };
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

export const decodeFullClient = (dbClient: any): FullClient => {
  return {
    id: dbClient._id,
    reference: dbClient.reference,
    contactData: decodeContactData(dbClient.contactData),
    fiscalData: decodeFiscalData(dbClient.fiscalData),
    postalData: decodePostalData(dbClient.postalData),
    tributationData: decodeTributationData(dbClient.tributationData),
    eFactData: decodeEFactData(dbClient.eFactData),
    bills: dbClient.bills.map(decodeBill),
  };
};

export const decodeProvider = (dbProvider: any): Provider => {
  return {
    id: dbProvider._id,
    reference: dbProvider.reference,
    contactData: dbProvider.contactData,
    fiscalData: dbProvider.fiscalData,
    postalData: dbProvider.postalData,
    tributationData: dbProvider.tributationData,
    eFactData: dbProvider.eFactData,
    bills: dbProvider.bills,
  };
};

export const decodeFullProvider = (dbProvider: any): FullProvider => {
  return {
    id: dbProvider._id,
    reference: dbProvider.reference,
    contactData: dbProvider.contactData,
    fiscalData: dbProvider.fiscalData,
    postalData: dbProvider.postalData,
    tributationData: dbProvider.tributationData,
    eFactData: dbProvider.eFactData,
    bills: dbProvider.bills.map((bill: any) => decodeBill(bill)),
  };
};
